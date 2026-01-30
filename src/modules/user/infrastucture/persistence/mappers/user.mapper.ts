import { UserModel } from '../../../domain/models/user.model';
import { UserEntity } from '../entities/user.entity';

export class UserMapper {
  static toEntity(domain: UserModel): UserEntity {
    const entity = new UserEntity();
    Object.assign(entity, domain);
    return entity;
  }

  static toDomain(userEntity: UserEntity, options?: { withPassword?: boolean }): UserModel {
    const withPassword = options?.withPassword ?? false;
    return new UserModel({
      ...userEntity,
      password: withPassword ? userEntity.password : undefined,
    });
  }
}
