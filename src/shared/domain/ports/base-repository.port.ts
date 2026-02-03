import { QueryDto } from '@/src/utils/dto/pagination.dto';
import { PaginationResponse } from '@/src/shared/infrastructure/types/pagination.type';

export interface IBaseRepository<T, R = T> {
  create(entity: T): Promise<T>;
  update(entity: T): Promise<T>;
  delete(id: string, hard?: boolean): Promise<void>;
  findById(id: string): Promise<R | null>;
  findAll(queryDto: QueryDto): Promise<PaginationResponse<R>>;
}
