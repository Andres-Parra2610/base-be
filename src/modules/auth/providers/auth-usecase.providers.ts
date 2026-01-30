import { Provider } from '@nestjs/common';
import { LoginUseCase } from '../application/use-cases/login.usecase';
import { ITokenPort } from '../application/ports/token.port';
import { FindUserByEmailUseCase } from '../../user/application/use-cases/find-by-email.usecase';

export const authUseCaseProviders: Provider[] = [
  {
    provide: LoginUseCase,
    useFactory: (tokenService: ITokenPort, findUserByEmailUseCase: FindUserByEmailUseCase) =>
      new LoginUseCase(tokenService, findUserByEmailUseCase),
    inject: ['TokenService', FindUserByEmailUseCase],
  },
];
