import { Entity, Column, Unique, Index } from 'typeorm';
import { BaseEntity } from '@/src/shared/infrastructure/persistent/typeorm/entity/base-entity';
import { ContextType, AppPermissions } from '../../../domain/types/roles.types';

@Entity('roles')
@Unique('UQ_roles_name_context', ['name', 'context_id'])
@Index('IDX_roles_context', ['context_id'])
export class RolesEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ name: 'context_type', type: 'enum', enum: ContextType })
  contextType: ContextType;

  @Column({ type: 'jsonb', default: {} })
  permissions: AppPermissions;

  @Column({ name: 'context_id', type: 'uuid', nullable: true })
  contextId?: string;

  @Column({ type: 'boolean', default: true })
  canDelete: boolean;
}
