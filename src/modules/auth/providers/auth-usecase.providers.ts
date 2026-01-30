import { Provider } from '@nestjs/common';
import { LoginUseCase } from '../application/use-cases/login.usecase';
import { ITokenPort } from '../application/ports/token.port';
import { FindUserByEmailUseCase } from '../../user/application/use-cases/find-by-email.usecase';
import { RefreshTokenUseCase } from '../application/use-cases/refresh-token.usecase';
import { IUserRepository } from '../../user/domain/ports/user-repository.port';

export const authUseCaseProviders: Provider[] = [
  {
    provide: LoginUseCase,
    useFactory: (tokenService: ITokenPort, findUserByEmailUseCase: FindUserByEmailUseCase) =>
      new LoginUseCase(tokenService, findUserByEmailUseCase),
    inject: ['TokenService', FindUserByEmailUseCase],
  },
  {
    provide: RefreshTokenUseCase,
    useFactory: (tokenService: ITokenPort, userRepository: IUserRepository) =>
      new RefreshTokenUseCase(tokenService, userRepository),
    inject: ['TokenService', 'UserRepository'],
  },
];
