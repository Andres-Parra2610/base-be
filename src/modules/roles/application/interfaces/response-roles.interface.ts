import { ResponseBaseInterface } from '@/src/shared/application/interfaces/response-base-interface';
import { ContextType } from '../../domain/types/roles.types';

export interface ResponseRoles extends ResponseBaseInterface {
  name: string;
  permissions: Record<string, unknown>;
  canDelete: boolean;
  description?: string;
  totalUsers?: number;
  totalPermissions?: number;
  contextType: ContextType;
  contextId?: string;
}
