import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { Public } from '@retcon/platform';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RefreshDto } from './dto/refresh.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}
  @Public()
  @Post('register')
  @Throttle({ default: { limit: 5 } })
  register(@Body() body: RegisterDto) {
    return this.auth.register(body);
  }
  @Public()
  @Post('login')
  @HttpCode(200)
  @Throttle({ default: { limit: 10 } })
  login(@Body() body: LoginDto) {
    return this.auth.login(body);
  }
  @Public()
  @Post('refresh')
  @HttpCode(200)
  @Throttle({ default: { limit: 20 } })
  refresh(@Body() body: RefreshDto) {
    return this.auth.refresh(body.refreshToken);
  }
  @Public()
  @Post('logout')
  @HttpCode(204)
  logout(@Body() body: RefreshDto) {
    return this.auth.logout(body.refreshToken);
  }
}
