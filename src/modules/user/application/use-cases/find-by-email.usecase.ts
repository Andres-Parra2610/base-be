import { UserModel } from '../../domain/models/user.model';
import { IFindUserByEmailOptions, IUserRepository } from '../../domain/ports/user-repository.port';

export class FindUserByEmailUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(email: string, options?: IFindUserByEmailOptions): Promise<UserModel | null> {
    console.log(this.userRepository, 'here');
    return this.userRepository.findByEmail(email, options);
  }
}
