import { RolesModel } from '@/src/modules/roles/domain/models/roles.model';
import { ResponseBaseInterface } from '@/src/shared/application/interfaces/response-base-interface';

export interface UserResponse extends ResponseBaseInterface {
  fullName: string;
  email: string;
  isStaff: boolean;
  role: RolesModel | null;
  password?: string;
}
