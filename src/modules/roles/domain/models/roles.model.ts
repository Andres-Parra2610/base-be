import { BaseModel, BaseModelParams } from '@/shared/domain/models/base.model';
import {
  AppPermissions,
  ContextType,
  PermissionAction,
  PermissionResource,
} from '../types/roles.types';
import { DomainError } from '@/src/utils/errors/domain.error';

export interface RolesModelParams extends BaseModelParams {
  id: string;
  context_type: ContextType;
  context_id?: string;
  name: string;
  permissions: AppPermissions;
}

export class RolesModel extends BaseModel<RolesModelParams> {
  context_type: ContextType;
  context_id?: string;
  name: string;
  permissions: AppPermissions;

  constructor(params: RolesModelParams) {
    super(params);
    this.validatePermissions(params.permissions);
    this.context_type = params.context_type;
    this.context_id = params.context_id;
    this.name = params.name;
    this.permissions = params.permissions;
  }

  private validatePermissions(permissions: AppPermissions) {
    const resources = Object.keys(permissions);

    const validResources = Object.values(PermissionResource) as string[];
    const validActions = Object.values(PermissionAction) as string[];

    for (const resource of resources) {
      if (!validResources.includes(resource)) {
        throw new DomainError(`El módulo de permisos '${resource}' no es válido.`);
      }

      const actions = Object.keys(permissions[resource as PermissionResource] || {});
      for (const action of actions) {
        if (!validActions.includes(action)) {
          throw new DomainError(`La acción '${action}' en el módulo '${resource}' no es válida.`);
        }
      }
    }
  }

  public can(resource: PermissionResource, action: PermissionAction): boolean {
    const resourcePermissions = this.permissions[resource];

    if (!resourcePermissions || !resourcePermissions[action]) {
      return false;
    }

    return true;
  }
}
