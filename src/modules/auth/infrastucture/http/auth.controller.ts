import { Body, Controller, Post } from '@nestjs/common';
import { LoginAuthDto } from './dto/create-auth.dto';
import { LoginUseCase } from '../../application/use-cases/login.usecase';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('login')
  async login(@Body() dto: LoginAuthDto) {
    return this.loginUseCase.execute(dto);
  }
}
