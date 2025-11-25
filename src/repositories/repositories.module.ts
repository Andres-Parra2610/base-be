import { Global, Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { repositoriesProviders } from './providers';

@Global()
@Module({
  imports: [DatabaseModule],
  providers: [...repositoriesProviders],
  exports: [...repositoriesProviders],
})
export class RepositoriesModule { }
