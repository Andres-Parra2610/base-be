import { Inject, Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { AsyncLocalStorage } from 'node:async_hooks';

@Injectable()
export class DbTransactionContext {
  private readonly asyncLocal: AsyncLocalStorage<EntityManager>;

  constructor(@Inject('DATA_SOURCE') private readonly dataSource: DataSource) {
    this.asyncLocal = new AsyncLocalStorage<EntityManager>();
  }

  /**
   * Runs a function within a transaction context
   * All database operations inside will use the provided EntityManager
   */

  runInContext<T>(manager: EntityManager, fn: () => Promise<T>): Promise<T> {
    return this.asyncLocal.run(manager, fn);
  }

  /**
   * Gets the current EntityManager from context
   * Falls back to default DataSource manager if not in a transaction
   */
  getEntityManager(): EntityManager {
    return this.asyncLocal.getStore() ?? this.dataSource.manager;
  }

  /**
   * Checks if we're currently inside a transaction
   */
  hasActiveTransaction(): boolean {
    return !!this.asyncLocal.getStore();
  }
}
