export enum ContextType {
  system = 'system',
  association = 'application',
  producer = 'producer',
}

export enum PermissionResource {
  USER = 'user',
  FARM = 'farm',
  ANIMAL = 'animal',
}

export enum PermissionAction {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  EXPORT = 'export',
}

export type PermissionRules = Partial<Record<PermissionAction, boolean>>;
export type AppPermissions = Partial<Record<PermissionResource, PermissionRules>>;
