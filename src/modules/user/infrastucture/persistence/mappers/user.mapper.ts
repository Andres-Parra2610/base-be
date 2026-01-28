import { UserModel } from '../../../domain/models/user.model';
import { UserEntity } from '../entities/user.entity';

export class UserMapper {
  static toEntity(domain: UserModel): UserEntity {
    const userEntity = new UserEntity();
    userEntity.id = domain.id;
    userEntity.fullName = domain.fullName;
    userEntity.email = domain.email;
    userEntity.password = domain.password!;
    userEntity.isStaff = domain.isStaff;
    userEntity.createdAt = domain.createdAt;
    userEntity.updatedAt = domain.updatedAt;
    userEntity.deletedAt = domain.deletedAt;
    userEntity.createdBy = domain.createdBy;
    userEntity.updatedBy = domain.updatedBy;
    userEntity.deletedBy = domain.deletedBy;
    return userEntity;
  }

  static toDomain(userEntity: UserEntity): UserModel {
    return new UserModel({
      id: userEntity.id,
      fullName: userEntity.fullName,
      email: userEntity.email,
      password: userEntity.password,
      isStaff: userEntity.isStaff,
      createdAt: userEntity.createdAt,
      updatedAt: userEntity.updatedAt,
      deletedAt: userEntity.deletedAt,
      createdBy: userEntity.createdBy,
      updatedBy: userEntity.updatedBy,
      deletedBy: userEntity.deletedBy,
    });
  }
}
