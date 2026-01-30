import { ITokenPort } from '../ports/token.port';
import { UserModel } from '@/src/modules/user/domain/models/user.model';
import { ILogin } from '../interfaces/login.interface';
import { IUserRepository } from '@/src/modules/user/domain/ports/user-repository.port';

export class LoginUseCase {
  constructor(
    private readonly repository: ITokenPort,
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(dto: ILogin): Promise<{ token: string; user: UserModel }> {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) {
      throw new Error('User not found');
    }
    const token = this.repository.generateToken({
      id: user.id,
      email: user.email,
    });
    return { token, user };
  }
}
