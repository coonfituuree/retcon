import { Injectable, Logger } from '@nestjs/common';
import type { OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from 'redis';
import type { RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit, OnApplicationShutdown {
  private readonly logger = new Logger(RedisService.name);
  private hasConnected = false;
  readonly client: RedisClientType;

  constructor(config: ConfigService) {
    this.client = createClient({
      url: config.getOrThrow<string>('redis.uri'),
      disableOfflineQueue: true,
      commandOptions: { timeout: config.getOrThrow<number>('redis.commandTimeoutMs') },
      socket: {
        connectTimeout: config.getOrThrow<number>('redis.connectTimeoutMs'),
        reconnectStrategy: (retries) =>
          !this.hasConnected && retries >= config.getOrThrow<number>('redis.reconnectAttempts')
            ? new Error('Redis reconnect limit reached')
            : config.getOrThrow<number>('redis.reconnectDelayMs'),
      },
    });
    this.client.on('error', () => this.logger.warn('Redis connection error'));
    this.client.on('ready', () => {
      this.hasConnected = true;
    });
  }

  async onModuleInit() {
    try {
      await this.client.connect();
    } catch {
      if (this.client.isOpen) this.client.destroy();
      throw new Error('Redis connection failed');
    }
  }

  async ping() {
    if (!this.client.isReady) throw new Error('Redis unavailable');
    return this.client.ping();
  }

  async onApplicationShutdown() {
    if (!this.client.isOpen) return;
    if (!this.client.isReady) {
      this.client.destroy();
      return;
    }
    try {
      await this.client.close();
    } catch {
      if (this.client.isOpen) this.client.destroy();
    }
  }
}
