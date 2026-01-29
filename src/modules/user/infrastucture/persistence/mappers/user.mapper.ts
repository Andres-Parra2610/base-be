import { UserModel } from '../../../domain/models/user.model';
import { UserEntity } from '../entities/user.entity';

export class UserMapper {
  static toEntity(domain: UserModel): UserEntity {
    const entity = new UserEntity();
    Object.assign(entity, domain);
    return entity;
  }

  static toDomain(userEntity: UserEntity): UserModel {
    return new UserModel({
      ...userEntity,
      password: userEntity.password,
    });
  }
}
