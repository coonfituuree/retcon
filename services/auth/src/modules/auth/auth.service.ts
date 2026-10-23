import { createHash, randomBytes, randomUUID } from 'node:crypto';
import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { RefreshToken } from './entities/refresh-token.entity';
import { DataSource, Repository } from 'typeorm';
import type { EntityManager } from 'typeorm';
import { AuthSession } from './entities/auth-session.entity';
import { Organization } from '../organizations/entities/organization.entity';
import { User } from '../users/entities/user.entity';
import type { LoginDto } from './dto/login.dto';
import type { RegisterDto } from './dto/register.dto';
import { publicUser } from '../../shared/utils/user-response';
const tokenHash = (token: string) => createHash('sha256').update(token).digest('hex');
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
    return this.issueTokens(tx, user, sessionId);
  }
  private async issueTokens(tx: EntityManager, user: User, sessionId: string) {
    const refreshToken = randomBytes(48).toString('hex');
    await tx.getRepository(RefreshToken).insert({ tokenHash: tokenHash(refreshToken), sessionId });
    const accessToken = jwt.sign(
      { tenantId: user.tenantId, role: user.role, sid: sessionId },
      this.config.getOrThrow<string>('jwt.privateKey'),
      {
        algorithm: 'RS256',
        subject: user.id,
        issuer: this.config.getOrThrow<string>('jwt.issuer'),
        audience: this.config.getOrThrow<string>('jwt.audience'),
        expiresIn: this.config.getOrThrow<number>('jwt.accessTokenTtlSeconds'),
      },
    );
    return {
      accessToken,
      refreshToken,
      tokenType: 'Bearer',
      expiresIn: this.config.getOrThrow<number>('jwt.accessTokenTtlSeconds'),
      user: publicUser(user),
    };
  }
}
