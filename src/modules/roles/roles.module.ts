import { Module } from '@nestjs/common';
import { RolesRepository } from './infrastucture/persistence/respositories/roles.repository';
import { RolesController } from './infrastucture/http/roles.controller';
import { rolesUseCaseProviders } from './providers/roles-usecase.providers';
import { DatabaseModule } from '@/src/shared/infrastructure/persistent/typeorm/database.module';

@Module({
  imports: [DatabaseModule],
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
