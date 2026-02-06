import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { IRolesRepository } from '../../../domain/ports/roles-repository.port';
import { RolesModel } from '../../../domain/models/roles.model';
import { RolesEntity } from '../entities/roles.entity';
import { PaginationResponse } from '@/src/shared/infrastructure/types/pagination.type';
import { QueryDto } from '@/src/utils/dto/pagination.dto';
import { HandleDbErrors } from '@/src/core/decorators/errors/db-errors.decortator';
import { RolesMapper } from '../mappers/roles.mapper';
import { TypeOrmQueryHelper } from '@/src/shared/infrastructure/persistent/typeorm/filter/typeorm-query-filter';
import { IRequestUser } from '@/src/core/decorators/user.decorator';
import { ResponseRoles } from '../../../application/interfaces/response-roles.interface';
import { SelectOptionDto } from '@/src/utils/dto/select.dto';

@Injectable()
export class RolesRepository implements IRolesRepository {
  private readonly repository: Repository<RolesEntity>;

  constructor(
    @Inject('DATA_SOURCE')
    private readonly dataSource: DataSource,
  ) {
    this.repository = dataSource.getRepository(RolesEntity);
  }

  @HandleDbErrors()
  async findSelectList(user?: IRequestUser): Promise<SelectOptionDto[]> {
    const qb = this.repository.createQueryBuilder('role').select(['role.id', 'role.name']);

    if (user?.role?.contextId) {
      qb.andWhere('role.context_id = :contextId', { contextId: user.role.contextId });
    }

    const entities = await qb.getMany();
    return entities.map((entity) => RolesMapper.toSelectOption(entity));
  }

  @HandleDbErrors()
  async create(entity: RolesModel): Promise<RolesModel> {
    const persistenceModel = RolesMapper.toPersistence(entity);
    const savedEntity = await this.repository.save(persistenceModel);
    return RolesMapper.toDomain(savedEntity);
  }

  @HandleDbErrors()
  async update(entity: RolesModel): Promise<RolesModel> {
    const persistenceModel = RolesMapper.toPersistence(entity);
    const savedEntity = await this.repository.save(persistenceModel);
    return RolesMapper.toDomain(savedEntity);
  }

  @HandleDbErrors()
  async delete(id: string, hard?: boolean): Promise<void> {
    if (hard) {
      await this.repository.delete(id);
    } else {
      await this.repository.update(id, { deletedAt: new Date() });
    }
  }

  @HandleDbErrors()
  async findById(id: string, user?: IRequestUser): Promise<ResponseRoles | null> {
    const qb = this.repository.createQueryBuilder('role');

    let roleEntity: RolesEntity | null = null;

    if (user?.role?.contextId) {
      roleEntity = await qb
        .where('role.context_id = :contextId', { contextId: user.role.contextId })
        .andWhere('role.id = :id', { id })
        .loadRelationCountAndMap('role.totalUsers', 'role.userRoles')
        .getOne();
    } else {
      roleEntity = await qb
        .where('role.id = :id', { id })
        .loadRelationCountAndMap('role.totalUsers', 'role.userRoles')
        .getOne();
    }

    if (!roleEntity) return null;
    return RolesMapper.toResponse(roleEntity);
  }

  @HandleDbErrors()
  async findAll(
    queryDto: QueryDto,
    user: IRequestUser,
  ): Promise<PaginationResponse<ResponseRoles>> {
    const qb = this.repository.createQueryBuilder('role');

    const allowedFilters = ['name'];
    const allowedSort = ['createdAt', 'name'];

    if (user.role?.contextId) {
      qb.andWhere('role.context_id = :contextId', { contextId: user.role.contextId });
    }

    // Contar cuantos usuarios tiene cada rol
    qb.loadRelationCountAndMap('role.totalUsers', 'role.userRoles');

    const queryBuilder = TypeOrmQueryHelper.applyRequest(qb, queryDto, allowedFilters, allowedSort);

    const [entities, total] = await queryBuilder.getManyAndCount();
    return {
      data: entities.map((entity) => RolesMapper.toResponse(entity)),
      total,
      page: queryDto.page,
      limit: queryDto.limit,
      totalPages: Math.ceil(total / (queryDto.limit || 1)),
    };
  }

  @HandleDbErrors()
  async existRoleByNameAndContext(name: string, contextId?: string): Promise<boolean> {
    const qb = this.repository.createQueryBuilder('role');

    qb.where('role.name = :name', { name });

    if (contextId) {
      qb.andWhere('role.context_id = :contextId', { contextId });
    } else {
      qb.andWhere('role.context_id IS NULL');
    }

    const result = await qb.getCount();
    return result > 0;
  }
}
