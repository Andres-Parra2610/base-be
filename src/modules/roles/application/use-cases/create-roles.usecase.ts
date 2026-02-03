import { IRolesRepository } from '../../domain/ports/roles-repository.port';
import { ICreateRoles } from '../interfaces/create-roles.interface';
import { RolesModel } from '../../domain/models/roles.model';
import { generateUuidV4 } from '@/src/utils/uuid/generate-uuid';
import { ApplicationError } from '@/src/utils/errors/application.error';

export class CreateRolesUseCase {
  constructor(private readonly repository: IRolesRepository) {}

  async execute(dto: ICreateRoles): Promise<RolesModel> {
    const alreadyExists = await this.repository.existRoleByNameAndContext(dto.name, dto.contextId);

    if (alreadyExists) {
      throw new ApplicationError(`Ya existe un rol con el nombre ${dto.name}`);
    }

    const entity = new RolesModel({
      id: generateUuidV4(),
      ...dto,
    });

    return this.repository.create(entity);
  }
}
