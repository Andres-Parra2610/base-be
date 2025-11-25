import { Injectable } from '@nestjs/common';
import { LoginDto, RefreshTokenDto } from './dto/auth.dto';
import { TokenUseCase } from './use-cases/command/token.usecase';
import { LoginUseCase } from './use-cases/command/login.usecase';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenUseCase: TokenUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) { }

  async login(body: LoginDto) {
    return this.loginUseCase.execute(body);
  }

  async refreshToken(body: RefreshTokenDto) {
    return this.tokenUseCase.excuteRefreshToken(body);
  }
}
