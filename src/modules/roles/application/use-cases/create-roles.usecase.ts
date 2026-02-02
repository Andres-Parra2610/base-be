import { IRolesRepository } from '../../domain/ports/roles-repository.port';
import { ICreateRoles } from '../interfaces/create-roles.interface';
import { RolesModel } from '../../domain/models/roles.model';
import { generateUuidV4 } from '@/src/utils/uuid/generate-uuid';

export class CreateRolesUseCase {
  constructor(private readonly repository: IRolesRepository) {}

  async execute(dto: ICreateRoles): Promise<RolesModel> {
    const entity = new RolesModel({
      id: generateUuidV4(),
      name: dto.name,
    });
    return this.repository.create(entity);
  }
}
