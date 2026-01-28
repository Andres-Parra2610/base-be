import { Module } from '@nestjs/common';
import { UserRepository } from './infrastucture/persistence/respositories/user.repository';
import { CreateUserUseCase } from './application/use-cases/create-user.usecase';
import { UuidGenerationService } from '@/src/shared/infrastructure/services/uuid-generator.service';
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
      provide: 'UuidGenerationService',
      useClass: UuidGenerationService,
    },
    {
      provide: CreateUserUseCase,
      useFactory: (repo, uuidGenerator) => {
        return new CreateUserUseCase(repo, uuidGenerator);
      },
      inject: ['UserRepository', 'UuidGenerationService'],
    },
  ],
  controllers: [UserController],
  exports: [CreateUserUseCase],
})
export class UserModule {}
