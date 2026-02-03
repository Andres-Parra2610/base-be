import { IUserRepository } from '../../domain/ports/user-repository.port';
import { UserModel } from '../../domain/models/user.model';
import { generateUuidV4 } from '@/src/utils/uuid/generate-uuid';
import { hashPassword } from '@/src/utils/hashes/hash-password';
import { ICreateUser } from '../interfaces/create-user.interface';
import { FindOneRolesUseCase } from '@/src/modules/roles/application/use-cases/find-one-roles.usecase';
import { UserRoleModel } from '../../domain/models/user-role.model';
import { IUserRoleRepository } from '../../domain/ports/user-role-repository.port';
import { ResponseUserInterface } from '../interfaces/response-user.interface';

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly userRoleRepository: IUserRoleRepository,
    private readonly findRoleByIdUseCase: FindOneRolesUseCase,
  ) {}

  async execute(createUserDto: ICreateUser): Promise<ResponseUserInterface> {
    UserModel.validatePassword(createUserDto.password || '');

    const user = new UserModel({
      id: generateUuidV4(),
      fullName: createUserDto.fullName,
      email: createUserDto.email,
      password: hashPassword(createUserDto.password || ''),
      isStaff: createUserDto.isStaff,
    });

    const role = await this.findRoleByIdUseCase.execute(createUserDto.roleId);

    const userRole = new UserRoleModel({
      id: generateUuidV4(),
      userId: user.id,
      roleId: role.id,
    });

    await this.userRoleRepository.create(userRole);
    const userCreated = await this.userRepository.create(user);
    return {
      ...userCreated,
      role: role,
    };
  }
}
