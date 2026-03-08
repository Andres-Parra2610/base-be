import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserModel } from '../../../domain/models/user.model';
import { UserMapper } from '../mappers/user.mapper';
import { HandleDbErrors } from '@/src/core/decorators/errors/db-errors.decortator';
import { TypeOrmQueryHelper } from '@/src/shared/infrastructure/persistent/typeorm/filter/typeorm-query-filter';
import { QueryDto } from '@/src/utils/dto/pagination.dto';
import { PaginationResponse } from '@/src/shared/infrastructure/types/pagination.type';
import { IUserQueryRepository } from '../../../domain/ports/user-query-repository.port';

@Injectable()
export class UserQueryRepository implements IUserQueryRepository {
  private readonly repository: Repository<UserEntity>;
  constructor(
    @Inject('DATA_SOURCE')
    private readonly dataSource: DataSource,
  ) {
    this.repository = this.dataSource.getRepository(UserEntity);
  }

  @HandleDbErrors()
  async findAll(queryDto: QueryDto): Promise<PaginationResponse<UserModel>> {
    const qb = this.repository.createQueryBuilder('user');

    const allowedFilters = ['fullName', 'email'];
    const allowedSort = ['createdAt', 'fullName'];

    const queryBuilder = TypeOrmQueryHelper.applyRequest(qb, queryDto, allowedFilters, allowedSort);

    const [entities, total] = await queryBuilder.getManyAndCount();
    return {
      data: entities.map((entity) => UserMapper.toDomain(entity)),
      total,
      page: queryDto.page,
      limit: queryDto.limit,
    };
  }
}
