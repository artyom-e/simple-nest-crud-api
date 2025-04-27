import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() data: SignUpDto) {
    return {
      auth_token: await this.authService.signUp(data),
    };
  }

  @Post('sign-in')
  async signIn(@Body() data: SignInDto) {
    return {
      auth_token: await this.authService.signIn(data),
    };
  }
}
