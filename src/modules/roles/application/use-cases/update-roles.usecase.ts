import { IRolesRepository } from '../../domain/ports/roles-repository.port';
import { IUpdateRoles } from '../interfaces/update-roles.interface';
import { RolesModel } from '../../domain/models/roles.model';
import { ApplicationError } from '@/src/utils/errors/application.error';

export class UpdateRolesUseCase {
  constructor(private readonly repository: IRolesRepository) {}

  async execute(input: IUpdateRoles): Promise<RolesModel | null> {
    const role = await this.repository.findById(input.id);
    if (!role) {
      throw new ApplicationError('Rol no encontrado');
    }
    const updatedRole = role.cloneWith(input);
    return this.repository.update(updatedRole);
  }
}
