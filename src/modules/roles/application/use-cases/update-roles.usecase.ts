import { ApplicationError } from '@/src/utils/errors/application.error';
import { IRolesRepository } from '../../domain/ports/roles-repository.port';
import { IUpdateRoles } from '../interfaces/update-roles.interface';
import { RolesModel } from '../../domain/models/roles.model';

export class UpdateRolesUseCase {
  constructor(private readonly repository: IRolesRepository) {}

  async execute(input: IUpdateRoles): Promise<RolesModel> {
    const role = await this.repository.findById(input.id);
    if (!role) {
      throw new ApplicationError('Rol no encontrado');
    }

    //Verificar si el nombre cambia y si existe otro rol con el mismo nombre
    if (input.name && role.name !== input.name) {
      const existRole = await this.repository.existRoleByNameAndContext(input.name, role.contextId);
      if (existRole) {
        throw new ApplicationError('Ya existe un rol con el mismo nombre');
      }
    }

    const updatedRole = role.cloneWith(input);
    return this.repository.update(updatedRole);
  }
}
