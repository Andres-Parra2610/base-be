import { Module } from '@nestjs/common';
import { AuthController } from './infrastucture/http/auth.controller';
import { authUseCaseProviders } from './providers/auth-usecase.providers';
import { UserModule } from '../user/user.module';
import { JwtTokenService } from './infrastucture/services/token.service';
import { JwtModule } from '@nestjs/jwt';
import { env } from '@/src/config/env';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@/src/core/guards/auth.guard';
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
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    ...authUseCaseProviders,
  ],
  controllers: [AuthController],
  exports: [...authUseCaseProviders],
})
export class AuthModule {}
