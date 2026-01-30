import { Module } from '@nestjs/common';
import { AuthController } from './infrastucture/http/auth.controller';
import { authUseCaseProviders } from './providers/auth-usecase.providers';
import { UserModule } from '../user/user.module';
import { JwtTokenService } from './infrastucture/services/token.service';
import { FindUserByEmailUseCase } from '../user/application/use-cases/find-by-email.usecase';
import { JwtModule } from '@nestjs/jwt';
import { env } from '@/src/config/env';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [
    {
      provide: 'TokenService',
      useClass: JwtTokenService,
    },
    {
      provide: 'FindUserByEmailUseCase',
      useClass: FindUserByEmailUseCase,
    },
    ...authUseCaseProviders,
  ],
  controllers: [AuthController],
  exports: [...authUseCaseProviders],
})
export class AuthModule {}
