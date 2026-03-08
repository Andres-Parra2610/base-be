import { Inject, Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { IsolationLevel } from 'typeorm/driver/types/IsolationLevel';
import { DbTransactionContext } from './transaction-context';

type Options = { propagation?: boolean; isolationLevel?: IsolationLevel };
@Injectable()
export class DbTransactionService {
  constructor(
    @Inject('DATA_SOURCE')
    private readonly dataSource: DataSource,
    private readonly transactionContext: DbTransactionContext,
  ) {}

  /**
   * Execute a function within a database transaction
   *
   * @param runInTransaction - Function to execute in transaction
   * @returns Result of the function
   */
  async executeInTransaction<T>(
    runInTransaction: (manager: EntityManager) => Promise<T>,
  ): Promise<T>;

  /**
   * Execute a function within a database transaction with options
   *
   * @param options - Transaction options (propagation, isolation level)
   * @param runInTransaction - Function to execute in transaction
   * @returns Result of the function
   */
  async executeInTransaction<T>(
    options: Options,
    runInTransaction: (manager: EntityManager) => Promise<T>,
  ): Promise<T>;

  async executeInTransaction<T>(
    optionsOrRunInTransaction: Options | ((manager: EntityManager) => Promise<T>),
    maybeRunInTransaction?: (manager: EntityManager) => Promise<T>,
  ): Promise<T> {
    // Handle both function signatures (with or without options)
    const options: Options =
      typeof optionsOrRunInTransaction === 'function'
        ? { propagation: true, isolationLevel: 'READ COMMITTED' }
        : optionsOrRunInTransaction;

    const runInTransaction =
      typeof optionsOrRunInTransaction === 'function'
        ? optionsOrRunInTransaction
        : maybeRunInTransaction;

    if (!runInTransaction) {
      throw new Error('runInTransaction function must be provided');
    }

    // If propagation is enabled and we're already in a transaction,
    // reuse the existing transaction instead of creating a nested one
    const { propagation = true, isolationLevel = 'READ COMMITTED' } = options;

    if (propagation && this.transactionContext.hasActiveTransaction()) {
      const existingManager = this.transactionContext.getEntityManager();
      return runInTransaction(existingManager);
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction(isolationLevel);

    try {
      // Execute the function within the transaction context
      return await this.transactionContext.runInContext(queryRunner.manager, async () => {
        const result = await runInTransaction(queryRunner.manager);
        await queryRunner.commitTransaction();
        return result;
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
