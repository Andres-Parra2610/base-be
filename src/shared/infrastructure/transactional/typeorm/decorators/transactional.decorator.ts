import { SetMetadata } from '@nestjs/common';
import { IsolationLevel } from 'typeorm/driver/types/IsolationLevel';

// Key to identify transactional methods
export const TRANSACTIONAL_KEY = Symbol('TRANSACTIONAL_METHOD');
/**
 * Marks a method as transactional.
 * Optionally accepts:
 * - propagation: whether to reuse existing transaction (default: true)
 * - isolationLevel: TypeORM IsolationLevel (default: 'READ COMMITTED')
 */

export function Transactional(propagation?: boolean, isolationLevel?: IsolationLevel) {
  return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    SetMetadata(TRANSACTIONAL_KEY, { isolationLevel, propagation })(
      target,
      propertyKey,
      descriptor,
    );
    return descriptor;
  };
}
