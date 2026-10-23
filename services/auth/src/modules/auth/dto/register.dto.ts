import { Transform } from 'class-transformer';
import { IsByteLength, IsString, Length, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CredentialsDto } from '../../../shared/dto/credentials.dto';

export class RegisterDto extends CredentialsDto {
  @ApiProperty({ minLength: 2, maxLength: 160 })
  @Transform(({ value }: { value: unknown }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @Length(2, 160)
  organizationName!: string;
  @IsString() @IsByteLength(12, 72) @MinLength(12) declare password: string;
}
