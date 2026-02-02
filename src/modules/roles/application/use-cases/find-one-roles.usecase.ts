import { IRolesRepository } from '../../domain/ports/roles-repository.port';
import { RolesModel } from '../../domain/models/roles.model';

export class FindOneRolesUseCase {
  constructor(private readonly repository: IRolesRepository) {}

  async execute(id: string): Promise<RolesModel | null> {
    return this.repository.findById(id);
  }
}
