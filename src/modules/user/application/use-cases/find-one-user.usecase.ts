import { IUserRepository } from '../../domain/ports/user-repository.port';
import { ApplicationError } from '@/src/utils/errors/application.error';
import { UserModel } from '../../domain/models/user.model';
import { UserResponse } from '../interfaces/response-user.interface';

export class FindOneUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string): Promise<UserResponse> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new ApplicationError('Usuario no encontrado');
    return user;
  }
}
