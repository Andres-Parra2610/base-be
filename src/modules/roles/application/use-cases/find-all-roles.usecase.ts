import { IRolesRepository } from '../../domain/ports/roles-repository.port';
import { QueryDto } from '@/src/utils/dto/pagination.dto';
import { PaginationResponse } from '@/src/shared/infrastructure/types/pagination.type';
import { IRequestUser } from '@/src/core/decorators/user.decorator';
import { ResponseRoles } from '../interfaces/response-roles.interface';
import { SelectOptionDto } from '@/src/utils/dto/select.dto';

export class FindAllRolesUseCase {
  constructor(private readonly repository: IRolesRepository) {}

  async execute(query: QueryDto, user: IRequestUser): Promise<PaginationResponse<ResponseRoles>> {
    this.validateUser(user);

    return this.repository.findAll(query, user);
  }

  async findSelectList(user: IRequestUser): Promise<SelectOptionDto[]> {
    this.validateUser(user);

    return this.repository.findSelectList(user);
  }

  private validateUser(user: IRequestUser): void {
    if (!user.isStaff && !user.role?.contextId) {
      throw new Error('User is not staff and has no contextId');
    }
  }
}
