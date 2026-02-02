import { IRolesRepository } from '../../domain/ports/roles-repository.port';
import { QueryDto } from '@/src/utils/dto/pagination.dto';
import { RolesModel } from '../../domain/models/roles.model';
import { PaginationResponse } from '@/src/shared/infrastructure/types/pagination.type';

export class FindAllRolesUseCase {
  constructor(private readonly repository: IRolesRepository) {}

  async execute(query: QueryDto): Promise<PaginationResponse<RolesModel>> {
    return this.repository.findAll(query);
  }
}
