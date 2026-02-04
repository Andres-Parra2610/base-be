import { IBaseRepository } from '@/shared/domain/ports/base-repository.port';
import { UserModel } from '../models/user.model';
import { UserResponse } from '../../application/interfaces/response-user.interface';

export interface IFindUserByEmailOptions {
  withPassword?: boolean;
}

export interface IUserRepository extends IBaseRepository<UserModel, UserResponse> {
  findByEmail(email: string, options?: IFindUserByEmailOptions): Promise<UserResponse | null>;
}
