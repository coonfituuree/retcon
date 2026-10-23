import 'reflect-metadata';
import type { Type } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import type { ServiceName } from './config';
export async function bootstrap(module: Type, _service: ServiceName) {
  const app = await NestFactory.create<NestExpressApplication>(module);
  const config = app.get(ConfigService);
  app.setGlobalPrefix('api/v1');
  app.enableShutdownHooks();
  await app.listen(config.getOrThrow<number>('http.port'), config.getOrThrow<string>('http.host'));
  return app;
}
