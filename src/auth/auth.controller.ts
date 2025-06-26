import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import type { LoginRequestBody } from './model/LoginRequestBody';
import type { AuthService } from './auth.service';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() { email, password }: LoginRequestBody) {
    return this.authService.login(email, password);
  }
}
