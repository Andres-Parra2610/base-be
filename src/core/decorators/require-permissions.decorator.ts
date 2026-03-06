import { SetMetadata } from '@nestjs/common';
import { PermissionAction, PermissionResource } from '@/src/modules/roles/domain/types/roles.types';

export const PERMISSIONS_KEY = 'permissions';

export interface RequiredPermission {
  resource: PermissionResource;
  action: PermissionAction;
}

export const RequirePermissions = (resource: PermissionResource, action: PermissionAction) =>
  SetMetadata(PERMISSIONS_KEY, { resource, action });
