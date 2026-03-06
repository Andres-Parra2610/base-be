import { ResponseBaseInterface } from '@/src/shared/application/interfaces/response-base-interface';

export interface UserResponse extends ResponseBaseInterface {
  fullName: string;
  email: string;
  password?: string;
}
