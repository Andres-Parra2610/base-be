import { IRolesRepository } from '../../domain/ports/roles-repository.port';
import { RolesModel } from '../../domain/models/roles.model';
import { ApplicationError } from '@/src/utils/errors/application.error';

export class FindOneRolesUseCase {
  constructor(private readonly repository: IRolesRepository) {}

  async execute(id: string): Promise<RolesModel> {
    const role = await this.repository.findById(id);
    if (!role) {
      throw new ApplicationError(`Rol no encontrado`);
    }
    return role;
  }
}
