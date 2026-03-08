import { Module, Global } from '@nestjs/common';
import { DatabaseModule } from '../persistent/typeorm/database.module';
import { UserRepository } from '@/src/modules/user/infrastucture/persistence/respositories/user.repository';

@Global()
@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: 'UserRepository',
      useClass: UserRepository,
    },
  ],
  exports: ['UserRepository'],
})
export class RepositoriesModule {}
