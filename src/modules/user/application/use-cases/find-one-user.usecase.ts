import { IUserRepository } from '../../domain/ports/user-repository.port';
import { ApplicationError } from '@/src/utils/errors/application.error';
import { UserModel } from '../../domain/models/user.model';
import { UserResponse } from '../interfaces/response-user.interface';

import { IRequestUser } from '@/src/core/decorators/user.decorator';

export class FindOneUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string, user?: IRequestUser): Promise<UserResponse> {
    const userResult = await this.userRepository.findById(id, user);
    if (!userResult) throw new ApplicationError('Usuario no encontrado');
    return userResult;
  }
}
