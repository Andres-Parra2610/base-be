import { Base } from 'src/shared/entities/base-entity';
import { City } from 'src/shared/entities/city.entity';
import { State } from 'src/shared/entities/state.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User extends Base {
  @Column({ name: 'full_name', type: 'text' })
  fullName: string;

  @Column({ name: 'identity_document', type: 'text', unique: true })
  identityDocument: string;

  @Column({ name: 'type_document', type: 'text', enum: ['V', 'J', 'E', 'G'] })
  typeDocument: string;

  @Column({ name: 'contact_number', type: 'text', nullable: true })
  contactNumber: string;

  @Column({ name: 'email', type: 'text' })
  email: string;

  @Column({ name: 'password', type: 'text' })
  password: string;

  @Column({ name: 'state_id', type: 'uuid', nullable: true })
  stateId: string;

  @Column({ name: 'city_id', type: 'uuid', nullable: true })
  cityId: string;

  /* Relations */
  @ManyToOne(() => State, { eager: true, nullable: true })
  @JoinColumn({ name: 'state_id' })
  state: State;

  @ManyToOne(() => City, { eager: true, nullable: true })
  @JoinColumn({ name: 'city_id' })
  city: City;

}
