import { AppPermissions, ContextType } from '../../domain/types/roles.types';

export interface ICreateRoles {
  name: string;
  canDelete: boolean;
  permissions: AppPermissions;
  contextType: ContextType;
  contextId?: string;
}
