import { Module, Global } from '@nestjs/common';
import { DatabaseModule } from '../persistent/typeorm/database.module';
import { UserRepository } from '@/src/modules/user/infrastructure/persistence/repositories/user.repository';
import { UserQueryRepository } from '@/src/modules/user/infrastructure/persistence/repositories/user-query-repository';
import { REPO_NAME } from '@/src/shared/infrastructure/repositories/names.repositories';

@Global()
@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: REPO_NAME.USER_REPOSITORY,
      useClass: UserRepository,
    },
    {
      provide: REPO_NAME.USER_QUERY_REPOSITORY,
      useClass: UserQueryRepository,
    },
  ],
  exports: [REPO_NAME.USER_REPOSITORY, REPO_NAME.USER_QUERY_REPOSITORY],
})
export class RepositoriesModule {}
