import { IRolesRepository } from '../../domain/ports/roles-repository.port';
import { QueryDto } from '@/src/utils/dto/pagination.dto';
import { RolesModel } from '../../domain/models/roles.model';
import { PaginationResponse } from '@/src/shared/infrastructure/types/pagination.type';
import { IRequestUser } from '@/src/core/decorators/user.decorator';

export class FindAllRolesUseCase {
  constructor(private readonly repository: IRolesRepository) {}

  async execute(query: QueryDto, user: IRequestUser): Promise<PaginationResponse<RolesModel>> {
    // Validar si el usuario es staff y no tiene contextId

    if (!user.isStaff && !user.role?.contextId) {
      throw new Error('User is not staff and has no contextId');
    }

    return this.repository.findAll(query, user);
  }
}
