import { ITokenPort } from '../ports/token.port';
import { UserModel } from '@/src/modules/user/domain/models/user.model';
import { ILogin } from '../interfaces/login.interface';
import { FindUserByEmailUseCase } from '@/src/modules/user/application/use-cases/find-by-email.usecase';
import { comparePassword } from '@/src/utils/hashes/hash-password';
import { ApplicationError } from '@/src/utils/errors/application.error';

export class LoginUseCase {
  constructor(
    private readonly repository: ITokenPort,
    private readonly findUserByEmailUseCase: FindUserByEmailUseCase,
  ) {}

  async execute(dto: ILogin): Promise<{ token: string; refreshToken: string; user: UserModel }> {
    const user = await this.findUserByEmailUseCase.execute(dto.email, { withPassword: true });
    if (!user) {
      throw new ApplicationError('Usuario o contraseña incorrecta');
    }

    const isPasswordValid = await comparePassword(dto.password, user.password!);
    if (!isPasswordValid) {
      throw new ApplicationError('Usuario o contraseña incorrecta');
    }

    const token = this.repository.generateToken({
      id: user.id,
      email: user.email,
    });

    const refreshToken = this.repository.generateRefreshToken({
      id: user.id,
      email: user.email,
    });

    return {
      token,
      refreshToken,
      user: {
        ...user,
        password: undefined,
      } as UserModel,
    };
  }
}
