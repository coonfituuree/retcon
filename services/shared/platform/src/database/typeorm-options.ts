import type { ConfigService } from '@nestjs/config';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import type { ServiceName } from '../config';

export function createTypeOrmOptions(config: ConfigService): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    url: config.getOrThrow<string>('database.url'),
    autoLoadEntities: true,
    synchronize: config.getOrThrow<boolean>('database.synchronize'),
    dropSchema: false,
    retryAttempts: config.getOrThrow<number>('database.retryAttempts'),
    retryDelay: config.getOrThrow<number>('database.retryDelayMs'),
    extra: {
      max: config.getOrThrow<number>('database.poolMax'),
      connectionTimeoutMillis: config.getOrThrow<number>('database.connectionTimeoutMs'),
      idleTimeoutMillis: config.getOrThrow<number>('database.idleTimeoutMs'),
      statement_timeout: config.getOrThrow<number>('database.statementTimeoutMs'),
      lock_timeout: config.getOrThrow<number>('database.lockTimeoutMs'),
      application_name: `retcon-${config.getOrThrow<ServiceName>('service')}`,
    },
  };
}
