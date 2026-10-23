import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createTypeOrmOptions } from '@retcon/platform';
import { ConfigurationModule } from '../config/configuration.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigurationModule],
      inject: [ConfigService],
      useFactory: createTypeOrmOptions,
    }),
  ],
})
export class DatabaseModule {}
