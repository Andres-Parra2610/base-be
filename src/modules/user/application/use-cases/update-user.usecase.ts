import { IUserRepository } from '../../domain/ports/user-repository.port';
import { UserModel } from '../../domain/models/user.model';
import { IUpdateUser } from '../interfaces/update-user.interface';
import { ApplicationError } from '@/src/utils/errors/application.error';
import { hashPassword } from '@/src/utils/hashes/hash-password';

export class UpdateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(updateUserDto: IUpdateUser): Promise<UserModel> {
    const user = await this.userRepository.findById(updateUserDto.id);
    if (!user) {
      throw new ApplicationError('Usuario no encontrado');
    }

    const userDomain = new UserModel(user);

    const { id, password, ...rest } = updateUserDto;

    const changes: Partial<UserModel> = {
      ...rest,
    };

    if (password) {
      UserModel.validatePassword(password);
      changes.password = hashPassword(password);
    }

    const updatedUser = userDomain.cloneWith(changes);

    return this.userRepository.update(updatedUser);
  }
}
