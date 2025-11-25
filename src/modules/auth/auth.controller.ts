import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto, RefreshTokenDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {

  constructor(private readonly authServvice: AuthService) { }

  @Public()
  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authServvice.login(body);
  }

  @Public()
  @Post('refresh-token')
  refreshToken(@Body() body: RefreshTokenDto) {
    return this.authServvice.refreshToken(body);
  }
}
