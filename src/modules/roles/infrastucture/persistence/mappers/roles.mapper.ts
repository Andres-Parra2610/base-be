import { SelectOptionDto } from '@/src/utils/dto/select.dto';
import { ResponseRoles } from '../../../application/interfaces/response-roles.interface';
import { RolesModel } from '../../../domain/models/roles.model';
import { RolesEntity } from '../entities/roles.entity';

export class RolesMapper {
  static toDomain(entity: RolesEntity): RolesModel {
    return new RolesModel(entity);
  }

  static toPersistence(domain: RolesModel): RolesEntity {
    const entity = new RolesEntity();
    Object.assign(entity, domain);
    return entity;
  }

  static toResponse(entity: RolesEntity): ResponseRoles {
    return {
      ...entity,
      canDelete: entity.canDelete,
      totalUsers: entity.totalUsers ?? 0,
      totalPermissions: Object.values(entity.permissions).filter((value) => value).length,
    };
  }

  static toSelectOption(entity: RolesEntity): SelectOptionDto {
    return {
      value: entity.id,
      label: entity.name,
    };
  }
}
