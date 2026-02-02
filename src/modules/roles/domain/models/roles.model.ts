import { BaseModel, BaseModelParams } from '@/shared/domain/models/base.model';
import { ContextType } from '../types/roles.types';

export interface RolesModelParams extends BaseModelParams {
  id: string;
  context_type: ContextType;
  context_id?: string;
  name: string;
  permissions: string;
}

export class RolesModel extends BaseModel<RolesModelParams> {
  context_type: ContextType;
  context_id?: string;
  name: string;
  permissions: string;

  constructor(params: RolesModelParams) {
    super(params);
    this.context_type = params.context_type;
    this.context_id = params.context_id;
    this.name = params.name;
    this.permissions = params.permissions;
  }
}
