import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { HealthController, HealthService } from './http';
import { AccessGuard } from './security';
import { RedisService } from './redis/redis.service';

@Global()
@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          ttl: config.getOrThrow<number>('http.throttleTtlMs'),
          limit: config.getOrThrow<number>('http.throttleLimit'),
        },
      ],
    }),
  ],
  controllers: [HealthController],
  providers: [
    HealthService,
    RedisService,
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_GUARD, useClass: AccessGuard },
  ],
  exports: [RedisService],
})
export class PlatformModule {}
