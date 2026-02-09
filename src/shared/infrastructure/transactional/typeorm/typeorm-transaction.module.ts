import { Global, Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { DbTransactionContext } from './transaction-context';
import { DbTransactionService } from './transaction.service';
import { DatabaseModule } from '../../persistent/typeorm/database.module';
import { TransactionalExecutor } from './transactional-executor';

@Global()
@Module({
  imports: [DatabaseModule, DiscoveryModule],
  providers: [DbTransactionContext, DbTransactionService, TransactionalExecutor],
  exports: [DbTransactionContext, DbTransactionService, TransactionalExecutor],
})
export class TypeOrmTransactionModule {}
