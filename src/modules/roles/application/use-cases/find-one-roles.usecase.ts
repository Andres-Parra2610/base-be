import { IRolesRepository } from '../../domain/ports/roles-repository.port';
import { RolesModel } from '../../domain/models/roles.model';
import { ApplicationError } from '@/src/utils/errors/application.error';
import { IRequestUser } from '@/src/core/decorators/user.decorator';
import { ResponseRoles } from '../interfaces/response-roles.interface';

export class FindOneRolesUseCase {
  constructor(private readonly repository: IRolesRepository) {}

  async execute(id: string, user?: IRequestUser): Promise<ResponseRoles> {
    const role = await this.repository.findById(id, user);
    if (!role) {
      throw new ApplicationError(`Rol no encontrado`);
    }
    return role;
  }
}
