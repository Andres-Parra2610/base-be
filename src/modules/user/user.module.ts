import { Module } from '@nestjs/common';
import { UserRepository } from './infrastucture/persistence/respositories/user.repository';
import { DatabaseModule } from '@/src/shared/infrastructure/persistent/typeorm/database.module';
import { UserController } from './infrastucture/http/user.controller';
import { userUseCaseProviders } from './providers/user-usecase.providers';
import { RolesModule } from '../roles/roles.module';
import { UserRoleRepository } from './infrastucture/persistence/respositories/user-role.repository';
import { TypeOrmTransactionModule } from '@/src/shared/infrastructure/transactional/typeorm/typeorm-transaction.module';

@Module({
  imports: [TypeOrmTransactionModule, RolesModule],
  providers: [
    {
      provide: 'UserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'UserRoleRepository',
      useClass: UserRoleRepository,
    },
    ...userUseCaseProviders,
  ],
  controllers: [UserController],
  exports: [...userUseCaseProviders],
})
export class UserModule {}
