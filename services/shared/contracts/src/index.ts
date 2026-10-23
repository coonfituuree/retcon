import 'reflect-metadata';
import { Allow, IsIn, IsUUID } from 'class-validator';

export const ROLES = ['ADMIN', 'OPERATOR', 'AUDITOR'] as const;
export type Role = (typeof ROLES)[number];

export class PrincipalDto {
  @IsUUID() sub!: string;
  @IsUUID() tenantId!: string;
  @IsIn(ROLES) role!: Role;
  @IsUUID() sid!: string;
  @Allow() iat?: number;
  @Allow() exp?: number;
  @Allow() iss?: string;
  @Allow() aud?: string;
}
export type Principal = PrincipalDto;
