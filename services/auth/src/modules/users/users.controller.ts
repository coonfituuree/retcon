import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Actor, Roles } from '@retcon/platform';
import type { Principal } from '@retcon/contracts';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@ApiBearerAuth()
@Controller('auth')
export class UsersController {
  constructor(private readonly users: UsersService) {}
  @Get('me') me(@Actor() actor: Principal) {
    return this.users.me(actor);
  }
  @Post('users')
  @Roles('ADMIN')
  create(@Actor() actor: Principal, @Body() body: CreateUserDto) {
    return this.users.createUser(actor, body);
  }
}
