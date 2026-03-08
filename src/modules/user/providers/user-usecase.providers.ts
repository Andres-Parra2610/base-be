import { Provider } from '@nestjs/common';
import { CreateUserUseCase } from '../application/use-cases/create-user.usecase';
import { UpdateUserUseCase } from '../application/use-cases/update-user.usecase';
import { DeleteUserUseCase } from '../application/use-cases/delete-user.usecase';
import { FindOneUserUseCase } from '../application/use-cases/find-one-user.usecase';
import { FindAllUserUseCase } from '../application/use-cases/find-all-user.usecase';
import { FindUserByEmailUseCase } from '../application/use-cases/find-by-email.usecase';
import { IUserRepository } from '../domain/ports/user-repository.port';
import { IUserQueryRepository } from '../domain/ports/user-query-repository.port';
import { REPO_NAME } from '@/src/shared/infrastructure/repositories/names.repositories';

export const userUseCaseProviders: Provider[] = [
  {
    provide: CreateUserUseCase,
    useFactory: (repo: IUserRepository) => new CreateUserUseCase(repo),
    inject: [REPO_NAME.USER_REPOSITORY],
  },
  {
    provide: UpdateUserUseCase,
    useFactory: (repo: IUserRepository) => new UpdateUserUseCase(repo),
    inject: [REPO_NAME.USER_REPOSITORY],
  },
  {
    provide: DeleteUserUseCase,
    useFactory: (repo: IUserRepository) => new DeleteUserUseCase(repo),
    inject: [REPO_NAME.USER_REPOSITORY],
  },
  {
    provide: FindOneUserUseCase,
    useFactory: (repo: IUserRepository) => new FindOneUserUseCase(repo),
    inject: [REPO_NAME.USER_REPOSITORY],
  },
  {
    provide: FindAllUserUseCase,
    useFactory: (repo: IUserQueryRepository) => new FindAllUserUseCase(repo),
    inject: [REPO_NAME.USER_QUERY_REPOSITORY],
  },
  {
    provide: FindUserByEmailUseCase,
    useFactory: (repo: IUserRepository) => new FindUserByEmailUseCase(repo),
    inject: [REPO_NAME.USER_REPOSITORY],
  },
];
