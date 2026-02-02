import { Module } from '@nestjs/common';
import { UserRepository } from './infrastucture/persistence/respositories/user.repository';
import { DatabaseModule } from '@/src/shared/infrastructure/persistent/typeorm/database.module';
import { UserController } from './infrastucture/http/user.controller';
import { userUseCaseProviders } from './providers/user-usecase.providers';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: 'UserRepository',
      useClass: UserRepository,
    },
    ...userUseCaseProviders,
  ],
  controllers: [UserController],
  exports: [...userUseCaseProviders],
})
export class UserModule {}
