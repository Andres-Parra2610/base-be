import { Provider } from '@nestjs/common';
import { LoginUseCase } from '../application/use-cases/login.usecase';
import { ITokenPort } from '../application/ports/token.port';
import { IUserRepository } from '@/src/modules/user/domain/ports/user-repository.port';

export const authUseCaseProviders: Provider[] = [
  {
    provide: LoginUseCase,
    useFactory: (tokenService: ITokenPort, userRepository: IUserRepository) =>
      new LoginUseCase(tokenService, userRepository),
    inject: ['TokenService', 'UserRepository'],
  },
];
