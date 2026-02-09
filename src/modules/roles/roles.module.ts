import { Module } from '@nestjs/common';
import { RolesRepository } from './infrastucture/persistence/respositories/roles.repository';
import { RolesController } from './infrastucture/http/roles.controller';
import { rolesUseCaseProviders } from './providers/roles-usecase.providers';
import { TypeOrmTransactionModule } from '@/src/shared/infrastructure/transactional/typeorm/typeorm-transaction.module';

@Module({
  imports: [TypeOrmTransactionModule],
  providers: [
    {
      provide: 'RolesRepository',
      useClass: RolesRepository,
    },
    ...rolesUseCaseProviders,
  ],
  controllers: [RolesController],
  exports: [...rolesUseCaseProviders],
})
export class RolesModule {}
