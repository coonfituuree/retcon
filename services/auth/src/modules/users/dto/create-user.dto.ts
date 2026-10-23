import { IsByteLength, IsIn, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ROLES } from '@retcon/contracts';
import type { Role } from '@retcon/contracts';
import { CredentialsDto } from '../../../shared/dto/credentials.dto';

export class CreateUserDto extends CredentialsDto {
  @ApiProperty({ enum: ROLES }) @IsIn(ROLES) role!: Role;
  @IsString() @IsByteLength(12, 72) @MinLength(12) declare password: string;
}
