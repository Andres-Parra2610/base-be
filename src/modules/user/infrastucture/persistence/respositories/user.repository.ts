import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import {
  IFindUserByEmailOptions,
  IUserRepository,
} from '../../../domain/ports/user-repository.port';
import { UserModel } from '../../../domain/models/user.model';
import { UserMapper } from '../mappers/user.mapper';
import { HandleDbErrors } from '@/src/core/decorators/errors/db-errors.decortator';
import { TypeOrmQueryHelper } from '@/src/shared/infrastructure/persistent/typeorm/filter/typeorm-query-filter';
import { QueryDto } from '@/src/utils/dto/pagination.dto';
import { FindAllResponse } from '@/src/shared/infrastructure/types/pagination.type';

@Injectable()
export class UserRepository implements IUserRepository {
  private readonly repository: Repository<UserEntity>;
  constructor(
    @Inject('DATA_SOURCE')
    private readonly dataSource: DataSource,
  ) {
    this.repository = this.dataSource.getRepository(UserEntity);
  }

  @HandleDbErrors()
  async create(user: UserModel): Promise<UserModel> {
    const persistenceModel = UserMapper.toEntity(user);
    const savedEntity = await this.repository.save(persistenceModel);
    return UserMapper.toDomain(savedEntity);
  }

  @HandleDbErrors()
  async findAll(queryDto: QueryDto): Promise<FindAllResponse<UserModel>> {
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

  @HandleDbErrors()
  async findByEmail(email: string, options?: IFindUserByEmailOptions): Promise<UserModel | null> {
    const entity = await this.repository.findOne({ where: { email } });
    if (!entity) return null;
    return UserMapper.toDomain(entity);
  }

  @HandleDbErrors()
  async findById(id: string): Promise<UserModel | null> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) return null;
    return UserMapper.toDomain(entity);
  }

  @HandleDbErrors()
  async update(user: UserModel): Promise<UserModel> {
    const persistenceModel = UserMapper.toEntity(user);
    const updatedEntity = await this.repository.save(persistenceModel);
    return UserMapper.toDomain(updatedEntity);
  }

  @HandleDbErrors()
  async delete(id: string, hard: boolean = false): Promise<void> {
    if (hard) {
      await this.repository.delete(id);
    } else {
      await this.repository.softDelete(id);
    }
  }
}
