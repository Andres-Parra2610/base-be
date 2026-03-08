import { Module } from '@nestjs/common';
import { UserController } from './infrastructure/http/user.controller';
import { userUseCaseProviders } from './providers/user-usecase.providers';

@Module({
  providers: [...userUseCaseProviders],
  controllers: [UserController],
  exports: [...userUseCaseProviders],
})
export class UserModule {}
