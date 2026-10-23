import {
  createParamDecorator,
  Injectable,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { PrincipalDto } from '@retcon/contracts';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import type { Principal } from '@retcon/contracts';
import type { Request } from 'express';
import jwt from 'jsonwebtoken';

export const Public = () => SetMetadata('retcon.public', true);
export const Actor = createParamDecorator(
  (_data: unknown, context: ExecutionContext): Principal =>
    context.switchToHttp().getRequest<Request & { actor: Principal }>().actor,
);

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly config: ConfigService,
  ) {}
  canActivate(context: ExecutionContext): boolean {
    const targets = [context.getHandler(), context.getClass()];
    if (this.reflector.getAllAndOverride<boolean>('retcon.public', targets)) return true;
    const request = context.switchToHttp().getRequest<Request & { actor: Principal }>();
    const match = /^Bearer ([^\s]+)$/.exec(request.headers.authorization ?? '');
    if (!match?.[1]) throw new UnauthorizedException('Bearer access token required');
    let actor: Principal;
    try {
      actor = plainToInstance(
        PrincipalDto,
        jwt.verify(match[1], this.config.getOrThrow<string>('jwt.publicKey'), {
          algorithms: ['RS256'],
          issuer: this.config.getOrThrow<string>('jwt.issuer'),
          audience: this.config.getOrThrow<string>('jwt.audience'),
          clockTolerance: this.config.getOrThrow<number>('jwt.clockToleranceSeconds'),
          maxAge: `${this.config.getOrThrow<number>('jwt.accessTokenTtlSeconds')}s`,
        }),
      );
      if (validateSync(actor).length) throw new Error('Invalid token claims');
    } catch {
      throw new UnauthorizedException('Invalid or expired access token');
    }
    request.actor = actor;
    return true;
  }
}
