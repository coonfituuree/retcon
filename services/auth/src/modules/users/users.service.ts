import { randomUUID } from 'node:crypto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import type { Principal } from '@retcon/contracts';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import type { CreateUserDto } from './dto/create-user.dto';
import { publicUser } from '../../shared/utils/user-response';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly config: ConfigService,
  ) {}
  async me(actor: Principal) {
    const user = await this.users.findOneBy({
      id: actor.sub,
      tenantId: actor.tenantId,
      active: true,
    });
    if (!user) throw new NotFoundException('User not found');
    return publicUser(user);
  }
  async createUser(actor: Principal, input: CreateUserDto) {
    const passwordHash = await hash(
      input.password,
      this.config.getOrThrow<number>('auth.bcryptSaltRounds'),
    );
    return publicUser(
      await this.users.save({
        id: randomUUID(),
        tenantId: actor.tenantId,
        email: input.email,
        passwordHash,
        role: input.role,
      }),
    );
  }
}
