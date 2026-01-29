import { Provider } from '@nestjs/common';
import { CreateUserUseCase } from '../application/use-cases/create-user.usecase';
import { UpdateUserUseCase } from '../application/use-cases/update-user.usecase';
import { DeleteUserUseCase } from '../application/use-cases/delete-user.usecase';
import { FindOneUserUseCase } from '../application/use-cases/find-one-user.usecase';
import { FindAllUserUseCase } from '../application/use-cases/find-all-user.usecase';
// ... otros use cases

export const userUseCaseProviders: Provider[] = [
  {
    provide: CreateUserUseCase,
    useFactory: (repo) => new CreateUserUseCase(repo),
    inject: ['UserRepository'],
  },
  {
    provide: UpdateUserUseCase,
    useFactory: (repo) => new UpdateUserUseCase(repo),
    inject: ['UserRepository'],
  },
  {
    provide: DeleteUserUseCase,
    useFactory: (repo) => new DeleteUserUseCase(repo),
    inject: ['UserRepository'],
  },
  {
    provide: FindOneUserUseCase,
    useFactory: (repo) => new FindOneUserUseCase(repo),
    inject: ['UserRepository'],
  },
  {
    provide: FindAllUserUseCase,
    useFactory: (repo) => new FindAllUserUseCase(repo),
    inject: ['UserRepository'],
  },
];
