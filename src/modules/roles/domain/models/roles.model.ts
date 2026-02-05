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
  contextType: ContextType;
  name: string;
  description?: string;
  permissions: AppPermissions;
  canDelete: boolean;
  contextId?: string;
}

export class RolesModel extends BaseModel<RolesModelParams> {
  contextType: ContextType;
  name: string;
  description?: string;
  permissions: AppPermissions;
  canDelete: boolean;
  contextId?: string;

  constructor(params: RolesModelParams) {
    super(params);

    this.validateRoleContext(params.contextType, params.contextId);
    this.validateDescription(params.description);
    this.validatePermissions(params.permissions);

    this.contextType = params.contextType;
    this.contextId = params.contextId;
    this.name = params.name;
    this.description = params.description;
    this.permissions = params.permissions;
    this.canDelete = params.canDelete;
  }

  private validateRoleContext(contextType: ContextType, contextId?: string) {
    if (contextType !== ContextType.system && !contextId) {
      throw new DomainError('Debe proporcionar contextId para el rol');
    }
  }

  private validateDescription(description?: string) {
    if (description && description.length > 255) {
      throw new DomainError('La descripción no puede exceder los 255 caracteres');
    }
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
