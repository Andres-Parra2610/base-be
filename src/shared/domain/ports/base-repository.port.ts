import { QueryDto } from '@/src/utils/dto/pagination.dto';
import { FindAllResponse } from '@/src/shared/infrastructure/types/pagination.type';

export interface IBaseRepository<T> {
  create(entity: T): Promise<T>;
  update(entity: T): Promise<T>;
  delete(id: string, hard?: boolean): Promise<void>;
  findById(id: string): Promise<T | null>;
  findAll(queryDto: QueryDto): Promise<FindAllResponse<T>>;
}
