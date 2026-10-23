import { randomBytes, randomUUID } from 'node:crypto';
import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { DataSource, Repository } from 'typeorm';
import type { EntityManager } from 'typeorm';
import { AuthSession } from './entities/auth-session.entity';
import { Organization } from '../organizations/entities/organization.entity';
import { User } from '../users/entities/user.entity';
import type { LoginDto } from './dto/login.dto';
import type { RegisterDto } from './dto/register.dto';
import { publicUser } from '../../shared/utils/user-response';
@Injectable()
export class AuthService {
  private readonly dummyHash: Promise<string>;
  constructor(
    private readonly db: DataSource,
    private readonly config: ConfigService,
    @InjectRepository(User)
    private readonly users: Repository<User>,
  ) {
    this.dummyHash = hash(
      randomBytes(32).toString('hex'),
      config.getOrThrow<number>('auth.bcryptSaltRounds'),
    );
  }
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
  async login(input: LoginDto) {
    const user = await this.users
      .createQueryBuilder('user')
      .addSelect('user.passwordHash')
      .where('user.email = :email', { email: input.email })
      .getOne();
    const valid = await compare(input.password, user?.passwordHash ?? (await this.dummyHash));
    if (!user?.active || !valid) throw new UnauthorizedException('Invalid credentials');
    return this.db.transaction((tx) => this.createSession(tx, user));
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
