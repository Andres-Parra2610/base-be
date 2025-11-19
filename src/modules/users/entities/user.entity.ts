import { City } from 'src/shared/entities/city.entity';
import { State } from 'src/shared/entities/state.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', type: 'text' })
  name: string;

  @Column({ name: 'lastname', type: 'text', nullable: true })
  lastname: string;

  @Column({ name: 'identity_document', type: 'text', unique: true })
  identityDocument: string;

  @Column({ name: 'type_document', type: 'text', enum: ['V', 'J', 'E', 'G'] })
  typeDocument: string;

  @Column({ name: 'state_id', type: 'uuid', nullable: true })
  stateId: string;

  @Column({ name: 'city_id', type: 'uuid', nullable: true })
  cityId: string;


  @Column({ name: 'physical_address', type: 'text', nullable: true })
  physicalAddress: string;

  @Column({ name: 'contact_number', type: 'text', nullable: true })
  contactNumber: string;

  @Column({ name: 'email', type: 'text', nullable: true })
  email: string;

  @Column({ name: 'password', type: 'text', nullable: true })
  password: string;

  @Column({
    name: 'user_type',
    type: 'text',
    enum: ['vendedor', 'cliente', 'admin']
  })
  userType: string;

  @Column({ name: 'client_type_id', type: 'bigint', nullable: true })
  clientTypeId: number;


  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;



  /* Relations */
  @ManyToOne(() => State, { eager: true, nullable: true })
  @JoinColumn({ name: 'state_id' })
  state: State;

  @ManyToOne(() => City, { eager: true, nullable: true })
  @JoinColumn({ name: 'city_id' })
  city: City;

}
