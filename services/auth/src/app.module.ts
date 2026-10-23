import { Module } from '@nestjs/common';
import { PlatformModule } from '@retcon/platform';
import { ConfigurationModule } from './config/configuration.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';

@Module({
  imports: [
    ConfigurationModule,
    DatabaseModule,
    PlatformModule,
    AuthModule,
    UsersModule,
    OrganizationsModule,
  ],
})
export class AppModule {}
