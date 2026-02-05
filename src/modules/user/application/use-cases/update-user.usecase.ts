import { IUserRepository } from '../../domain/ports/user-repository.port';
import { UserModel } from '../../domain/models/user.model';
import { IUpdateUser } from '../interfaces/update-user.interface';
import { ApplicationError } from '@/src/utils/errors/application.error';
import { hashPassword } from '@/src/utils/hashes/hash-password';
import { IUserRoleRepository } from '../../domain/ports/user-role-repository.port';
import { FindOneRolesUseCase } from '@/src/modules/roles/application/use-cases/find-one-roles.usecase';
import { UserRoleModel } from '../../domain/models/user-role.model';
import { generateUuidV4 } from '@/src/utils/uuid/generate-uuid';
import { UserResponse } from '../interfaces/response-user.interface';
import { RolesModel } from '@/src/modules/roles/domain/models/roles.model';
import { ResponseRoles } from '@/src/modules/roles/application/interfaces/response-roles.interface';

export class UpdateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly userRoleRepository: IUserRoleRepository,
    private readonly findRoleByIdUseCase: FindOneRolesUseCase,
  ) {}

  async execute(updateUserDto: IUpdateUser): Promise<UserResponse> {
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

    let role: ResponseRoles | null = null;

    //Si cambia el rol, actualizar el rol del usuario
    if (updateUserDto.roleId && user.role?.id && updateUserDto.roleId !== user.role.id) {
      role = await this.findRoleByIdUseCase.execute(updateUserDto.roleId);
      // Eliminamos el rol anterior
      await this.userRoleRepository.delete(user.id, user.role.id);
      // Creamos el nuevo rol
      const userRole = new UserRoleModel({
        id: generateUuidV4(),
        userId: user.id,
        roleId: role.id,
      });
      await this.userRoleRepository.create(userRole);
    }

    const updatedUser = userDomain.cloneWith(changes);

    return {
      ...updatedUser,
      role: role,
    };
  }
}
