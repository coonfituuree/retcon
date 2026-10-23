import 'reflect-metadata';
import { randomUUID } from 'node:crypto';
import {
  Catch,
  Controller,
  Get,
  HttpException,
  Injectable,
  Logger,
  ServiceUnavailableException,
  ValidationPipe,
} from '@nestjs/common';
import type { ArgumentsHost, ExceptionFilter, Type } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';
import type { Request, Response } from 'express';
import helmet from 'helmet';
import pino from 'pino';
import pinoHttp from 'pino-http';
import { isUUID } from 'class-validator';
import { DataSource, QueryFailedError } from 'typeorm';
import type { ServiceName } from './config';
import { Public } from './security';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpErrorFilter.name);
  catch(error: unknown, host: ArgumentsHost) {
    const request = host.switchToHttp().getRequest<Request & { id: string }>();
    const response = host.switchToHttp().getResponse<Response>();
    const failure: unknown = error instanceof QueryFailedError ? error.driverError : error;
    const code =
      failure && typeof failure === 'object' && 'code' in failure ? failure.code : undefined;
    const status =
      error instanceof HttpException
        ? error.getStatus()
        : code === '23505'
          ? 409
          : code === '23503'
            ? 400
            : 500;
    if (status >= 500)
      this.logger.error({
        message: 'Unhandled request failure',
        requestId: request.id,
        error: error instanceof Error ? error.name : 'UnknownError',
        code,
      });
    response.status(status).json({
      statusCode: status,
      error:
        error instanceof HttpException
          ? error.getResponse()
          : status === 409
            ? 'Resource already exists'
            : status === 400
              ? 'Invalid resource reference'
              : 'Internal server error',
      requestId: request.id,
    });
  }
}

@Injectable()
export class HealthService {
  constructor(
    private readonly db: DataSource,
    private readonly config: ConfigService,
  ) {}
  async readiness() {
    try {
      await this.db.query('SELECT 1');
      const service = this.config.getOrThrow<ServiceName>('service');
      return { status: 'ok', service };
    } catch {
      throw new ServiceUnavailableException('Dependencies unavailable');
    }
  }
}

@Public()
@SkipThrottle()
@Controller('health')
export class HealthController {
  constructor(private readonly health: HealthService) {}
  @Get('live') live() {
    return { status: 'ok' };
  }
  @Get('ready') ready() {
    return this.health.readiness();
  }
}

export async function bootstrap(module: Type, service: ServiceName) {
  const app = await NestFactory.create<NestExpressApplication>(module, { bufferLogs: true });
  const config = app.get(ConfigService);
  app.set('trust proxy', config.getOrThrow<number>('http.trustProxyHops') || false);
  const logger = pino({
    level: config.getOrThrow<string>('http.logLevel'),
    base: { service },
    redact: ['req.headers.authorization', 'req.headers.cookie', 'res.headers.set-cookie'],
  });
  app.useLogger({
    log: (message: unknown) => logger.info(message),
    error: (message: unknown) => logger.error(message),
    warn: (message: unknown) => logger.warn(message),
    debug: (message: unknown) => logger.debug(message),
    verbose: (message: unknown) => logger.trace(message),
    fatal: (message: unknown) => logger.fatal(message),
  });
  app.use(
    pinoHttp({
      logger,
      genReqId: (request, response) => {
        const incoming = request.headers['x-request-id'];
        const id = typeof incoming === 'string' && isUUID(incoming) ? incoming : randomUUID();
        response.setHeader('x-request-id', id);
        return id;
      },
      serializers: {
        req: (request) => ({
          id: request.id,
          method: request.method,
          url: String(request.url).split('?')[0],
        }),
        res: (response) => ({ statusCode: response.statusCode }),
      },
    }),
  );
  app.use(helmet());
  app.use((_request: Request, response: Response, next: () => void) => {
    response.setHeader('Cache-Control', 'no-store');
    next();
  });
  app.enableCors({
    origin: config.getOrThrow<string[]>('http.origins'),
    credentials: false,
    exposedHeaders: ['x-request-id'],
  });
  app.useBodyParser('json', { limit: config.getOrThrow<number>('http.bodyLimitBytes') });
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }),
  );
  app.useGlobalFilters(new HttpErrorFilter());
  app.enableShutdownHooks();
  if (config.getOrThrow<boolean>('http.swaggerEnabled')) {
    const document = SwaggerModule.createDocument(
      app,
      new DocumentBuilder().setTitle(`Retcon ${service}`).setVersion('1.0').addBearerAuth().build(),
    );
    SwaggerModule.setup('docs', app, document);
  }
  await app.listen(config.getOrThrow<number>('http.port'), config.getOrThrow<string>('http.host'));
  const server = app.getHttpServer() as {
    requestTimeout: number;
    headersTimeout: number;
    keepAliveTimeout: number;
  };
  server.requestTimeout = config.getOrThrow<number>('http.requestTimeoutMs');
  server.headersTimeout = config.getOrThrow<number>('http.headersTimeoutMs');
  server.keepAliveTimeout = config.getOrThrow<number>('http.keepAliveTimeoutMs');
  return app;
}
