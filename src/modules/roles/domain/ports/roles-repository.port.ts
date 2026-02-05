import { RolesModel } from '../models/roles.model';
import { QueryDto } from '@/src/utils/dto/pagination.dto';
import { PaginationResponse } from '@/src/shared/infrastructure/types/pagination.type';
import { IRequestUser } from '@/src/core/decorators/user.decorator';

export interface IRolesRepository {
  create(entity: RolesModel): Promise<RolesModel>;
  update(entity: RolesModel): Promise<RolesModel>;
  delete(id: string, hard?: boolean): Promise<void>;
  findAll(queryDto: QueryDto, user: IRequestUser): Promise<PaginationResponse<RolesModel>>;
  findById(id: string, user?: IRequestUser): Promise<RolesModel | null>;
  existRoleByNameAndContext(name: string, contextId?: string): Promise<boolean>;
}
