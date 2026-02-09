import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IUserRoleRepository } from '../../../domain/ports/user-role-repository.port';
import { UserRoleEntity } from '../entities/user-role.entity';
import { UserRoleModel } from '../../../domain/models/user-role.model';
import { UserRoleMapper } from '../mappers/user-role.mapper';
import { HandleDbErrors } from '@/src/core/decorators/errors/db-errors.decortator';
import { DbTransactionContext } from '@/src/shared/infrastructure/transactional/typeorm/transaction-context';

@Injectable()
export class UserRoleRepository implements IUserRoleRepository {
  private readonly repository: Repository<UserRoleEntity>;

  constructor(private readonly transactionContext: DbTransactionContext) {
    this.repository = this.transactionContext.getEntityManager().getRepository(UserRoleEntity);
  }

  @HandleDbErrors()
  async create(userRole: UserRoleModel): Promise<UserRoleModel> {
    const persistenceModel = UserRoleMapper.toPersistence(userRole);
    const entity = await this.repository.save(persistenceModel);
    return UserRoleMapper.toDomain(entity);
  }

  @HandleDbErrors()
  async delete(userId: string, roleId: string): Promise<void> {
    await this.repository.delete({ userId, roleId });
  }

  @HandleDbErrors()
  async updateUserRole(userRole: UserRoleModel): Promise<UserRoleModel> {
    const persistenceModel = UserRoleMapper.toPersistence(userRole);
    const updatedEntity = await this.repository.save(persistenceModel);
    return UserRoleMapper.toDomain(updatedEntity);
  }
}
