import { Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshDto {
  @ApiProperty() @Matches(/^[a-f0-9]{96}$/) refreshToken!: string;
}
