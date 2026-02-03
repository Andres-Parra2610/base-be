import { ApplicationError } from '@/src/utils/errors/application.error';
import { IRolesRepository } from '../../domain/ports/roles-repository.port';

export class DeleteRolesUseCase {
  constructor(private readonly repository: IRolesRepository) {}

  async execute(id: string): Promise<void> {
    const role = await this.repository.findById(id);

    if (!role) {
      throw new ApplicationError(`No se encontro el rol con el id ${id}`);
    }

    return this.repository.delete(id);
  }
}
