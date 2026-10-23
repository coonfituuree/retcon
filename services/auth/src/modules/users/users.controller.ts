import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Actor } from '@retcon/platform';
import type { Principal } from '@retcon/contracts';
import { UsersService } from './users.service';
@ApiTags('users')
@ApiBearerAuth()
@Controller('auth')
export class UsersController {
  constructor(private readonly users: UsersService) {}
  @Get('me') me(@Actor() actor: Principal) {
    return this.users.me(actor);
  }
}
