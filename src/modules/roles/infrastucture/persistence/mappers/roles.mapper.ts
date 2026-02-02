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
}
