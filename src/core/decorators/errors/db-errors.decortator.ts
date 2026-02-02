import { TypeOrmErrorMapper } from '@/src/shared/infrastructure/persistent/typeorm/errors/error-mappert';

export function HandleDbErrors() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        return await originalMethod.apply(this, args);
      } catch (error) {
        TypeOrmErrorMapper.map(error);
      }
    };

    return descriptor;
  };
}
