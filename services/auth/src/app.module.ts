import { Module } from '@nestjs/common';
import { PlatformModule } from '@retcon/platform';
import { AuthModule } from './modules/auth/auth.module';
@Module({ imports: [PlatformModule, AuthModule] })
export class AppModule {}
