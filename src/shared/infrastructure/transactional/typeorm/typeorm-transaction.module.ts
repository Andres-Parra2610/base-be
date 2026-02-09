import { Global, Module } from '@nestjs/common';
import { DbTransactionContext } from './transaction-context';
import { DbTransactionService } from './transaction.service';
import { DatabaseModule } from '../../persistent/typeorm/database.module';

@Global()
@Module({
  imports: [DatabaseModule],
  providers: [DbTransactionContext, DbTransactionService],
  exports: [DbTransactionContext, DbTransactionService],
})
export class TypeOrmTransactionModule {}
