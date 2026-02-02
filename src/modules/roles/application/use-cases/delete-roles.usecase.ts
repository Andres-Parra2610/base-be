import { IRolesRepository } from '../../domain/ports/roles-repository.port';

export class DeleteRolesUseCase {
  constructor(private readonly repository: IRolesRepository) {}

  async execute(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
