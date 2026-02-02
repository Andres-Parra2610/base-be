import { Injectable } from '@nestjs/common';
import { ITokenPort } from '../ports/token.port';
import { ApplicationError } from '@/src/utils/errors/application.error';
import { UserModel } from '@/src/modules/user/domain/models/user.model';
import { FindOneUserUseCase } from '@/src/modules/user/application/use-cases/find-one-user.usecase';

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private readonly tokenService: ITokenPort,
    private readonly findUserByIdUseCase: FindOneUserUseCase,
  ) {}

  async execute(
    refreshToken: string,
  ): Promise<{ token: string; refreshToken: string; user: UserModel }> {
    try {
      const payload = this.tokenService.verifyRefreshToken(refreshToken);
      const user = await this.findUserByIdUseCase.execute(payload.id);

      if (!user) {
        throw new ApplicationError('User not found');
      }

      const newAccessToken = this.tokenService.generateToken({
        id: user.id,
        email: user.email,
      });

      const newRefreshToken = this.tokenService.generateRefreshToken({
        id: user.id,
        email: user.email,
      });

      return {
        token: newAccessToken,
        refreshToken: newRefreshToken,
        user: {
          ...user,
          password: undefined,
        } as UserModel,
      };
    } catch (error) {
      console.error(error);
      throw new ApplicationError('Invalid Refresh Token');
    }
  }
}
