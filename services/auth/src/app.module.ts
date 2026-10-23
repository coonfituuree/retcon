import { Module } from '@nestjs/common';
import { PlatformModule } from '@retcon/platform';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigurationModule } from './config/configuration.module';
@Module({ imports: [ConfigurationModule, PlatformModule, AuthModule] })
export class AppModule {}
