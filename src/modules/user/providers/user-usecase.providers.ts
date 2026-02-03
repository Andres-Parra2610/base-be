import { Provider } from '@nestjs/common';
import { CreateUserUseCase } from '../application/use-cases/create-user.usecase';
import { UpdateUserUseCase } from '../application/use-cases/update-user.usecase';
import { DeleteUserUseCase } from '../application/use-cases/delete-user.usecase';
import { FindOneUserUseCase } from '../application/use-cases/find-one-user.usecase';
import { FindAllUserUseCase } from '../application/use-cases/find-all-user.usecase';
import { FindUserByEmailUseCase } from '../application/use-cases/find-by-email.usecase';
import { IUserRepository } from '../domain/ports/user-repository.port';
import { FindOneRolesUseCase } from '../../roles/application/use-cases/find-one-roles.usecase';
import { IUserRoleRepository } from '../domain/ports/user-role-repository.port';

export const userUseCaseProviders: Provider[] = [
  {
    provide: CreateUserUseCase,
    useFactory: (
      userRepo: IUserRepository,
      userRoleRepo: IUserRoleRepository,
      findRoleByIdUseCase: FindOneRolesUseCase,
    ) => new CreateUserUseCase(userRepo, userRoleRepo, findRoleByIdUseCase),
    inject: ['UserRepository', 'UserRoleRepository', FindOneRolesUseCase],
  },
  {
    provide: UpdateUserUseCase,
    useFactory: (
      userRepo: IUserRepository,
      userRoleRepo: IUserRoleRepository,
      findRoleByIdUseCase: FindOneRolesUseCase,
    ) => new UpdateUserUseCase(userRepo, userRoleRepo, findRoleByIdUseCase),
    inject: ['UserRepository', 'UserRoleRepository', FindOneRolesUseCase],
  },
  {
    provide: DeleteUserUseCase,
    useFactory: (userRepo: IUserRepository, userRoleRepo: IUserRoleRepository) =>
      new DeleteUserUseCase(userRepo, userRoleRepo),
    inject: ['UserRepository', 'UserRoleRepository'],
  },
  {
    provide: FindOneUserUseCase,
    useFactory: (userRepo: IUserRepository) => new FindOneUserUseCase(userRepo),
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
