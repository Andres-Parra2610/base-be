import { ApplicationError } from '@/src/utils/errors/application.error';
import { IUserRepository } from '../../domain/ports/user-repository.port';
import { IUserRoleRepository } from '../../domain/ports/user-role-repository.port';

export interface DeleteUserResponse {
  id: string;
  message: string;
}

export class DeleteUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly userRoleRepository: IUserRoleRepository,
  ) {}

  async execute(id: string): Promise<DeleteUserResponse> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new ApplicationError('Usuario no encontrado');
    await this.userRoleRepository.delete(id, user.role.id);
    await this.userRepository.delete(id);
    return { id, message: 'Usuario eliminado correctamente' };
  }
}
