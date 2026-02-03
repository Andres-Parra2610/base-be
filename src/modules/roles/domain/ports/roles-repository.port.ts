import { IBaseRepository } from '@/shared/domain/ports/base-repository.port';
import { RolesModel } from '../models/roles.model';

export interface IRolesRepository extends IBaseRepository<RolesModel> {
  existRoleByNameAndContext(name: string, contextId?: string): Promise<boolean>;
}
