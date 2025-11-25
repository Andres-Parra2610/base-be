import { CreateUserDto } from "src/modules/users/dto/create-user.dto";
import { User } from "src/modules/users/entities/user.entity";


export type AppEvents = {
  /* USERS EMIT AND LISTEN */
  'find.user': {
    payload: { userId: string };
    response: User | null;
  };
  'created.user': {
    payload: CreateUserDto;
    response: User | null;
  };
};