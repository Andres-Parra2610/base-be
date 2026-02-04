import { IFindUserByEmailOptions, IUserRepository } from '../../domain/ports/user-repository.port';
import { UserResponse } from '../interfaces/response-user.interface';

export class FindUserByEmailUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(email: string, options?: IFindUserByEmailOptions): Promise<UserResponse | null> {
    return this.userRepository.findByEmail(email, options);
  }
}
