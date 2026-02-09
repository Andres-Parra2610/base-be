import { IUserRepository } from '../../domain/ports/user-repository.port';
import { UserModel } from '../../domain/models/user.model';
import { generateUuidV4 } from '@/src/utils/uuid/generate-uuid';
import { hashPassword } from '@/src/utils/hashes/hash-password';
import { ICreateUser } from '../interfaces/create-user.interface';
import { FindOneRolesUseCase } from '@/src/modules/roles/application/use-cases/find-one-roles.usecase';
import { UserRoleModel } from '../../domain/models/user-role.model';
import { IUserRoleRepository } from '../../domain/ports/user-role-repository.port';
import { UserResponse } from '../interfaces/response-user.interface';
import { Transactional } from '@/src/shared/infrastructure/transactional/typeorm/decorators/transactional.decorator';

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly userRoleRepository: IUserRoleRepository,
    private readonly findRoleByIdUseCase: FindOneRolesUseCase,
  ) {}

  @Transactional()
  async execute(createUserDto: ICreateUser): Promise<UserResponse> {
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

    const userCreated = await this.userRepository.create(user);
    //Probar si la transaccion funciona
    throw new Error('Error de prueba');
    await this.userRoleRepository.create(userRole);
    return {
      ...userCreated,
      role: role,
    };
  }
}
