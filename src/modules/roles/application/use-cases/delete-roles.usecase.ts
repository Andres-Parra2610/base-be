import { ApplicationError } from '@/src/utils/errors/application.error';
import { IRolesRepository } from '../../domain/ports/roles-repository.port';

export interface DeleteRolesResponse {
  id: string;
  message: string;
}

export class DeleteRolesUseCase {
  constructor(private readonly repository: IRolesRepository) {}

  async execute(id: string): Promise<DeleteRolesResponse> {
    const role = await this.repository.findById(id);

    if (!role) {
      throw new ApplicationError(`No se encontro el rol con el id ${id}`);
    }

    await this.repository.delete(id);
    return { id, message: 'Rol eliminado correctamente' };
  }
}
