import { randomUUID } from 'node:crypto';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { hash } from 'bcrypt';
import { DataSource } from 'typeorm';
import type { EntityManager } from 'typeorm';
import { AuthSession } from './entities/auth-session.entity';
import { Organization } from '../organizations/entities/organization.entity';
import { User } from '../users/entities/user.entity';
import type { RegisterDto } from './dto/register.dto';
import { publicUser } from '../../shared/utils/user-response';
@Injectable()
export class AuthService {
  constructor(
    private readonly db: DataSource,
    private readonly config: ConfigService,
  ) {}
  async register(input: RegisterDto) {
    if (!this.config.getOrThrow<boolean>('auth.registrationEnabled'))
      throw new ForbiddenException('Registration disabled');
    const passwordHash = await hash(
      input.password,
      this.config.getOrThrow<number>('auth.bcryptSaltRounds'),
    );
    return this.db.transaction(async (tx) => {
      const tenantId = randomUUID();
      await tx.getRepository(Organization).insert({ id: tenantId, name: input.organizationName });
      const user = await tx
        .getRepository(User)
        .save({ id: randomUUID(), tenantId, email: input.email, passwordHash, role: 'ADMIN' });
      return this.createSession(tx, user);
    });
  }
  private async createSession(tx: EntityManager, user: User) {
    const sessionId = randomUUID();
    const expiresAt = new Date(Date.now());
    expiresAt.setUTCDate(
      expiresAt.getUTCDate() + this.config.getOrThrow<number>('auth.refreshTokenTtlDays'),
    );
    await tx.getRepository(AuthSession).insert({ id: sessionId, userId: user.id, expiresAt });
    return { sessionId, user: publicUser(user) };
  }
}
