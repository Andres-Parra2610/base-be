import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
import { IsolationLevel } from 'typeorm/driver/types/IsolationLevel';
import { DbTransactionService } from './transaction.service';
import { TRANSACTIONAL_KEY } from './decorators/transactional.decorator';

/**
 * Scans all providers in the application on bootstrap,
 * finds methods marked with @Transactional,
 * and wraps them in transaction logic automatically.
 */
@Injectable()
export class TransactionalExecutor implements OnApplicationBootstrap {
  constructor(
    private readonly discovery: DiscoveryService,
    private readonly scanner: MetadataScanner,
    private readonly reflector: Reflector,
    private readonly transactionService: DbTransactionService,
  ) {}
  onApplicationBootstrap() {
    this.applyTransactionalWrappers();
  }
  private applyTransactionalWrappers() {
    // Get all providers that have instances
    const providers = this.discovery.getProviders().filter((p) => p.instance);
    for (const wrapper of providers) {
      const instance = wrapper.instance;
      const prototype = Object.getPrototypeOf(instance);
      if (!prototype) continue;
      // Get all method names from the prototype
      const methodNames = this.scanner.scanFromPrototype(instance, prototype, (name) => name);
      for (const methodName of methodNames) {
        const originalMethod = instance[methodName];
        if (typeof originalMethod !== 'function') continue;
        // Check if method has transactional metadata
        const metadata = this.reflector.get<{
          isolationLevel?: IsolationLevel;
          propagation?: boolean;
        }>(TRANSACTIONAL_KEY, originalMethod);
        if (!metadata) continue;
        // Wrap the original method inside executeInTransaction
        instance[methodName] = async (...args: unknown[]) => {
          return this.transactionService.executeInTransaction(
            {
              propagation: metadata.propagation ?? true,
              isolationLevel: metadata.isolationLevel ?? 'READ COMMITTED',
            },
            async () => {
              return originalMethod.apply(instance, args);
            },
          );
        };
      }
    }
  }
}
