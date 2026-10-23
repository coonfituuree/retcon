import 'reflect-metadata';
import type { Type, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Catch, HttpException, Logger, ValidationPipe } from '@nestjs/common';
import type { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import type { ServiceName } from './config';
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

export async function bootstrap(module: Type, _service: ServiceName) {
  const app = await NestFactory.create<NestExpressApplication>(module);
  const config = app.get(ConfigService);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }),
  );
  app.useGlobalFilters(new HttpErrorFilter());
  app.enableShutdownHooks();
  await app.listen(config.getOrThrow<number>('http.port'), config.getOrThrow<string>('http.host'));
  return app;
}
