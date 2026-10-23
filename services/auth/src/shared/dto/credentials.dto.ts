import { Transform } from 'class-transformer';
import { IsByteLength, IsEmail, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CredentialsDto {
  @ApiProperty({ format: 'email' })
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.toLowerCase() : value,
  )
  @IsEmail()
  @MaxLength(254)
  email!: string;
  @ApiProperty({ format: 'password', maxLength: 72 })
  @IsString()
  @IsByteLength(1, 72)
  password!: string;
}
