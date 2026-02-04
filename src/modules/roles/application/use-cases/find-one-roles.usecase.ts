import { IRolesRepository } from '../../domain/ports/roles-repository.port';
import { RolesModel } from '../../domain/models/roles.model';
import { ApplicationError } from '@/src/utils/errors/application.error';
import { IRequestUser } from '@/src/core/decorators/user.decorator';

export class FindOneRolesUseCase {
  constructor(private readonly repository: IRolesRepository) {}

  async execute(id: string, user: IRequestUser): Promise<RolesModel> {
    const role = await this.repository.findById(id, user);
    if (!role) {
      throw new ApplicationError(`Rol no encontrado`);
    }
    return role;
  }
}
