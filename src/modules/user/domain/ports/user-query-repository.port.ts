import { QueryDto } from '@/src/utils/dto/pagination.dto';
import { PaginationResponse } from '@/src/shared/infrastructure/types/pagination.type';
import { UserModel } from '../models/user.model';

export interface IUserQueryRepository {
  findAll(queryDto: QueryDto): Promise<PaginationResponse<UserModel>>;
}
