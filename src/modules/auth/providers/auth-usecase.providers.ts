import { Provider } from '@nestjs/common';
import { LoginUseCase } from '../application/use-cases/login.usecase';
import { ITokenPort } from '../application/ports/token.port';
import { FindUserByEmailUseCase } from '../../user/application/use-cases/find-by-email.usecase';
import { RefreshTokenUseCase } from '../application/use-cases/refresh-token.usecase';
import { FindOneUserUseCase } from '../../user/application/use-cases/find-one-user.usecase';

export const authUseCaseProviders: Provider[] = [
  {
    provide: LoginUseCase,
    useFactory: (tokenService: ITokenPort, findUserByEmailUseCase: FindUserByEmailUseCase) =>
      new LoginUseCase(tokenService, findUserByEmailUseCase),
    inject: ['TokenService', FindUserByEmailUseCase],
  },
  {
    provide: RefreshTokenUseCase,
    useFactory: (tokenService: ITokenPort, findUserByIdUseCase: FindOneUserUseCase) =>
      new RefreshTokenUseCase(tokenService, findUserByIdUseCase),
    inject: ['TokenService', FindOneUserUseCase],
  },
];
