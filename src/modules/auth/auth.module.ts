import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'src/config/env';
import { TokenUseCase } from './use-cases/command/token.usecase';
import { LoginUseCase } from './use-cases/command/login.usecase';

@Module({
  controllers: [AuthController],
  providers: [AuthService, TokenUseCase, LoginUseCase],
  imports: [
    JwtModule.register({
      global: true,
      secret: env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ]
})
export class AuthModule { }
