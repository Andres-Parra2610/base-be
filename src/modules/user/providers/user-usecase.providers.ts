import { Provider } from '@nestjs/common';
import { CreateUserUseCase } from '../application/use-cases/create-user.usecase';
import { UpdateUserUseCase } from '../application/use-cases/update-user.usecase';
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
];
