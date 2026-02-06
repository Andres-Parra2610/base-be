import { IBaseRepository } from '@/shared/domain/ports/base-repository.port';
import { UserModel } from '../models/user.model';
import { UserResponse } from '../../application/interfaces/response-user.interface';
import { QueryDto } from '@/src/utils/dto/pagination.dto';
import { PaginationResponse } from '@/src/shared/infrastructure/types/pagination.type';

import { IRequestUser } from '@/src/core/decorators/user.decorator';

export interface IFindUserByEmailOptions {
  withPassword?: boolean;
}

export interface IUserRepository extends IBaseRepository<UserModel, UserResponse> {
  findByEmail(email: string, options?: IFindUserByEmailOptions): Promise<UserResponse | null>;
  findAll(queryDto: QueryDto, user?: IRequestUser): Promise<PaginationResponse<UserResponse>>;
  findById(id: string, user?: IRequestUser): Promise<UserResponse | null>;
}
