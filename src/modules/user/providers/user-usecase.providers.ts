import { Provider } from '@nestjs/common';
import { CreateUserUseCase } from '../application/use-cases/create-user.usecase';
import { UpdateUserUseCase } from '../application/use-cases/update-user.usecase';
import { DeleteUserUseCase } from '../application/use-cases/delete-user.usecase';
import { FindOneUserUseCase } from '../application/use-cases/find-one-user.usecase';
import { FindAllUserUseCase } from '../application/use-cases/find-all-user.usecase';
import { FindUserByEmailUseCase } from '../application/use-cases/find-by-email.usecase';
import { IUserRepository } from '../domain/ports/user-repository.port';

export const userUseCaseProviders: Provider[] = [
  {
    provide: CreateUserUseCase,
    useFactory: (repo: IUserRepository) => new CreateUserUseCase(repo),
    inject: ['UserRepository'],
  },
  {
    provide: UpdateUserUseCase,
    useFactory: (repo: IUserRepository) => new UpdateUserUseCase(repo),
    inject: ['UserRepository'],
  },
  {
    provide: DeleteUserUseCase,
    useFactory: (repo: IUserRepository) => new DeleteUserUseCase(repo),
    inject: ['UserRepository'],
  },
  {
    provide: FindOneUserUseCase,
    useFactory: (repo: IUserRepository) => new FindOneUserUseCase(repo),
    inject: ['UserRepository'],
  },
  {
    provide: FindAllUserUseCase,
    useFactory: (repo: IUserRepository) => new FindAllUserUseCase(repo),
    inject: ['UserRepository'],
  },
  {
    provide: FindUserByEmailUseCase,
    useFactory: (repo: IUserRepository) => new FindUserByEmailUseCase(repo),
    inject: ['UserRepository'],
  },
];
