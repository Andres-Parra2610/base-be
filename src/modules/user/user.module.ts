import { Module } from '@nestjs/common';
import { UserRepository } from './infrastucture/persistence/respositories/user.repository';
import { CreateUserUseCase } from './application/use-cases/create-user.usecase';
import { DatabaseModule } from '@/src/shared/infrastructure/persistent/typeorm/database.module';
import { UserController } from './infrastucture/http/user.controller';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: 'UserRepository',
      useClass: UserRepository,
    },
    {
      provide: CreateUserUseCase,
      useFactory: (repo) => {
        return new CreateUserUseCase(repo);
      },
      inject: ['UserRepository'],
    },
  ],
  controllers: [UserController],
  exports: [CreateUserUseCase],
})
export class UserModule {}
