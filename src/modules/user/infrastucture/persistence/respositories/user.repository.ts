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
import { PaginationResponse } from '@/src/shared/infrastructure/types/pagination.type';
import { UserResponse } from '../../../application/interfaces/response-user.interface';
import { IRequestUser } from '@/src/core/decorators/user.decorator';
import { DbTransactionContext } from '@/src/shared/infrastructure/transactional/typeorm/transaction-context';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly transactionContext: DbTransactionContext) {}

  private get repository(): Repository<UserEntity> {
    return this.transactionContext.getEntityManager().getRepository(UserEntity);
  }

  @HandleDbErrors()
  async create(user: UserModel): Promise<UserModel> {
    const persistenceModel = UserMapper.toPersistence(user);
    const savedEntity = await this.repository.save(persistenceModel);
    return UserMapper.toDomain(savedEntity);
  }

  @HandleDbErrors()
  async findAll(
    queryDto: QueryDto,
    user?: IRequestUser,
  ): Promise<PaginationResponse<UserResponse>> {
    const qb = this.repository.createQueryBuilder('user');

    qb.leftJoinAndSelect('user.userRole', 'userRole');
    qb.leftJoinAndSelect('userRole.role', 'role');

    if (user?.role?.contextId) {
      qb.andWhere('role.context_id = :contextId', { contextId: user.role.contextId });
    }

    //Exlcuir el usuario actual
    if (user?.id) {
      qb.andWhere('user.id != :id', { id: user.id });
    }

    const allowedFilters = ['fullName', 'email'];
    const allowedSort = ['createdAt', 'fullName'];

    const queryBuilder = TypeOrmQueryHelper.applyRequest(qb, queryDto, allowedFilters, allowedSort);

    const [entities, total] = await queryBuilder.getManyAndCount();
    return {
      data: entities.map((entity) => UserMapper.toResponse(entity)),
      total,
      page: queryDto.page,
      limit: queryDto.limit,
    };
  }

  @HandleDbErrors()
  async findByEmail(
    email: string,
    options?: IFindUserByEmailOptions,
  ): Promise<UserResponse | null> {
    const qb = this.repository.createQueryBuilder('user');

    qb.leftJoinAndSelect('user.userRole', 'userRole');
    qb.leftJoinAndSelect('userRole.role', 'role');
    qb.where('user.email = :email', { email });

    const entity = await qb.getOne();
    if (!entity) return null;
    return UserMapper.toResponse(entity, options);
  }

  @HandleDbErrors()
  async findById(id: string, user?: IRequestUser): Promise<UserResponse | null> {
    const qb = this.repository.createQueryBuilder('user');

    qb.leftJoinAndSelect('user.userRole', 'userRole');
    qb.leftJoinAndSelect('userRole.role', 'role');
    qb.where('user.id = :id', { id });

    if (user?.role?.contextId) {
      qb.andWhere('role.context_id = :contextId', { contextId: user.role.contextId });
    }

    const entity = await qb.getOne();
    if (!entity) return null;
    return UserMapper.toResponse(entity);
  }

  @HandleDbErrors()
  async update(user: UserModel): Promise<UserModel> {
    const persistenceModel = UserMapper.toPersistence(user);
    const updatedEntity = await this.repository.save(persistenceModel);
    return UserMapper.toDomain(updatedEntity);
  }

  @HandleDbErrors()
  async delete(id: string, hard: boolean = false): Promise<void> {
    if (hard) {
      await this.repository.delete(id);
    } else {
      await this.repository.update(id, { deletedAt: new Date() });
    }
  }
}
