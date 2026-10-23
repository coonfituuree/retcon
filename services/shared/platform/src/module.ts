import { Global, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AccessGuard } from './security';
@Global()
@Module({ providers: [{ provide: APP_GUARD, useClass: AccessGuard }] })
export class PlatformModule {}
