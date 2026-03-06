import { UserRoleModel } from '../models/user-role.model';

export interface IUserRoleRepository {
  create(userRole: UserRoleModel): Promise<UserRoleModel>;
  delete(userId: string, roleId: string): Promise<void>;
  updateUserRole(userRole: UserRoleModel): Promise<UserRoleModel>;
}
