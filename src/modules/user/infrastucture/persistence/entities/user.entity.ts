import { BaseEntity } from '@/src/shared/infrastructure/persistent/typeorm/entity/base-entity';
import { Column, Entity, Index, Unique } from 'typeorm';

@Entity({ name: 'users' })
@Unique('UQ_user_email', ['email'])
@Index('IDX_user_email_fullname', ['email', 'fullName'])
export class UserEntity extends BaseEntity {
  @Column({ name: 'full_name', nullable: false })
  fullName: string;

  @Column({ name: 'email', nullable: false })
  email: string;

  @Column({ name: 'password', nullable: false })
  password: string;

  @Column({ name: 'is_staff', type: 'boolean', nullable: false, default: false })
  isStaff: boolean;
}
