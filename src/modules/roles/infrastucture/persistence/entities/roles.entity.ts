import { Entity, Column } from 'typeorm';
import { BaseEntity } from '@/src/shared/infrastructure/persistent/typeorm/entity/base-entity';

@Entity('roles')
export class RolesEntity extends BaseEntity {
  @Column()
  name: string;
}
