import { IUserRepository } from '../../domain/ports/user-repository.port';
import { UserModel } from '../../domain/models/user.model';
import { CreateUserDto } from '../dtos/create-user.dto';
import { generateUuidV4 } from '@/src/shared/generals/uuid/generate-uuid';

export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(createUserDto: CreateUserDto): Promise<UserModel> {
    const user = new UserModel({
      id: generateUuidV4(),
      fullName: createUserDto.fullName,
      email: createUserDto.email,
      password: createUserDto.password,
      isStaff: createUserDto.isStaff,
    });
    return this.userRepository.create(user);
  }
}
