import { BaseModel, BaseModelParams } from '@/src/shared/domain/models/base.model';

export interface UserRoleModelParams extends BaseModelParams {
  userId: string;
  roleId: string;
}

export class UserRoleModel extends BaseModel<UserRoleModelParams> {
  userId: string;
  roleId: string;

  constructor(params: UserRoleModelParams) {
    super(params);
    this.userId = params.userId;
    this.roleId = params.roleId;
  }
}
