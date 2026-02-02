import { Provider } from '@nestjs/common';
import { CreateRolesUseCase } from '../application/use-cases/create-roles.usecase';
import { FindAllRolesUseCase } from '../application/use-cases/find-all-roles.usecase';
import { FindOneRolesUseCase } from '../application/use-cases/find-one-roles.usecase';
import { UpdateRolesUseCase } from '../application/use-cases/update-roles.usecase';
import { DeleteRolesUseCase } from '../application/use-cases/delete-roles.usecase';

export const rolesUseCaseProviders: Provider[] = [
  {
    provide: CreateRolesUseCase,
    useFactory: (repo) => new CreateRolesUseCase(repo),
    inject: ['RolesRepository'],
  },
  {
    provide: FindAllRolesUseCase,
    useFactory: (repo) => new FindAllRolesUseCase(repo),
    inject: ['RolesRepository'],
  },
  {
    provide: FindOneRolesUseCase,
    useFactory: (repo) => new FindOneRolesUseCase(repo),
    inject: ['RolesRepository'],
  },
  {
    provide: UpdateRolesUseCase,
    useFactory: (repo) => new UpdateRolesUseCase(repo),
    inject: ['RolesRepository'],
  },
  {
    provide: DeleteRolesUseCase,
    useFactory: (repo) => new DeleteRolesUseCase(repo),
    inject: ['RolesRepository'],
  },
];
