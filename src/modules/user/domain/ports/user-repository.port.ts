import { IBaseRepository } from '@/shared/domain/ports/base-repository.port';
import { UserModel } from '../models/user.model';
import { ResponseUserInterface } from '../../application/interfaces/response-user.interface';

export interface IFindUserByEmailOptions {
  withPassword?: boolean;
}

export interface IUserRepository extends IBaseRepository<UserModel, ResponseUserInterface> {
  findByEmail(email: string, options?: IFindUserByEmailOptions): Promise<UserModel | null>;
}
