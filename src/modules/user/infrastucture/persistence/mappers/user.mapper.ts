import { UserResponse } from '../../../application/interfaces/response-user.interface';
import { UserModel } from '../../../domain/models/user.model';
import { UserEntity } from '../entities/user.entity';
import { RolesMapper } from '../../../../roles/infrastucture/persistence/mappers/roles.mapper';
import { RolesModel } from '../../../../roles/domain/models/roles.model';

export class UserMapper {
  static toDomain(userEntity: UserEntity, options?: { withPassword?: boolean }): UserModel {
    const withPassword = options?.withPassword ?? false;
    return new UserModel({
      ...userEntity,
      password: withPassword ? userEntity.password : undefined,
    });
  }

  static toPersistence(domain: UserModel): UserEntity {
    const entity = new UserEntity();
    Object.assign(entity, domain);
    return entity;
  }

  static toResponse(userEntity: UserEntity): UserResponse {
    let role: RolesModel | null = null;
    if (userEntity.userRole && userEntity.userRole.role) {
      role = RolesMapper.toDomain(userEntity.userRole.role);
    }

    return {
      id: userEntity.id,
      createdAt: userEntity.createdAt,
      updatedAt: userEntity.updatedAt,
      deletedAt: userEntity.deletedAt,
      fullName: userEntity.fullName,
      email: userEntity.email,
      isStaff: userEntity.isStaff,
      role: role,
    };
  }
}
