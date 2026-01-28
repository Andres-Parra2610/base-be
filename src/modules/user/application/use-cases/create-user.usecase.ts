import { IUuidGenerationRepository } from 'src/shared/domain/ports/uuid-generation-repository.port';
import { IUserRepository } from '../../domain/ports/user-repository.port';
import { UserModel } from '../../domain/models/user.model';
import { CreateUserDto } from '../dtos/create-user.dto';

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly uuidGenerationRepository: IUuidGenerationRepository,
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<UserModel> {
    const user = new UserModel({
      id: this.uuidGenerationRepository.generate(),
      fullName: createUserDto.fullName,
      email: createUserDto.email,
      password: createUserDto.password,
      isStaff: createUserDto.isStaff,
    });
    return this.userRepository.create(user);
  }
}
