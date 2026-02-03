import { Entity, Column, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { BaseEntity } from '@/src/shared/infrastructure/persistent/typeorm/entity/base-entity';
import { UserEntity } from './user.entity';
import { RolesEntity } from '@/src/modules/roles/infrastucture/persistence/entities/roles.entity';

@Entity('user_roles')
@Unique('UQ_user_roles_user_id', ['userId'])
export class UserRoleEntity extends BaseEntity {
  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column({ name: 'role_id', type: 'uuid' })
  roleId: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id', foreignKeyConstraintName: 'FK_user_roles_user_id' })
  user: UserEntity;

  @ManyToOne(() => RolesEntity)
  @JoinColumn({ name: 'role_id', foreignKeyConstraintName: 'FK_user_roles_role_id' })
  role: RolesEntity;
}
