import { Provider } from '@nestjs/common';
import { CreateAuthUseCase } from '../application/use-cases/create-auth.usecase';

export const authUseCaseProviders: Provider[] = [
  {
    provide: CreateAuthUseCase,
    useFactory: (repo) => new CreateAuthUseCase(repo),
    inject: ['AuthRepository'],
  },
];
