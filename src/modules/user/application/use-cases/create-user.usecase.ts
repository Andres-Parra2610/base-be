import { IUserRepository } from '../../domain/ports/user-repository.port';
import { UserModel } from '../../domain/models/user.model';
import { generateUuidV4 } from '@/src/utils/uuid/generate-uuid';
import { hashPassword } from '@/src/utils/hashes/hash-password';
import { ICreateUser } from '../interfaces/create-user.interface';

export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(createUserDto: ICreateUser): Promise<UserModel> {
    UserModel.validatePassword(createUserDto.password || '');

    const user = new UserModel({
      id: generateUuidV4(),
      fullName: createUserDto.fullName,
      email: createUserDto.email,
      password: hashPassword(createUserDto.password || ''),
      isStaff: createUserDto.isStaff,
    });

    return this.userRepository.create(user);
  }
}
