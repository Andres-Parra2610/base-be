import { UserRoleModel } from '../../../domain/models/user-role.model';
import { UserRoleEntity } from '../entities/user-role.entity';

export class UserRoleMapper {
  static toDomain(entity: UserRoleEntity): UserRoleModel {
    return new UserRoleModel({
      ...entity,
    });
  }

  static toPersistence(userRole: UserRoleModel): UserRoleEntity {
    const entity = new UserRoleEntity();
    Object.assign(entity, userRole);
    return entity;
  }
}
