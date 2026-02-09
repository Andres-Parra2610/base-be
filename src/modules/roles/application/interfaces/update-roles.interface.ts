import { ICreateRoles } from './create-roles.interface';

export interface IUpdateRoles extends Partial<ICreateRoles> {
  id: string;
}
