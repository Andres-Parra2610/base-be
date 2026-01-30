import { Module } from '@nestjs/common';
import { AuthController } from './infrastucture/http/auth.controller';
import { authUseCaseProviders } from './providers/auth-usecase.providers';

@Module({
  imports: [],
  providers: [...authUseCaseProviders],
  controllers: [AuthController],
  exports: [...authUseCaseProviders],
})
export class AuthModule {}
