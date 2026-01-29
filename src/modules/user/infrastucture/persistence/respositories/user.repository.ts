import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { IUserRepository } from '../../../domain/ports/user-repository.port';
import { UserModel } from '../../../domain/models/user.model';
import { UserMapper } from '../mappers/user.mapper';
import { DatabaseError } from '@/src/utils/errors/database.error';

@Injectable()
export class UserRepository implements IUserRepository {
  private readonly repository: Repository<UserEntity>;
  constructor(
    @Inject('DATA_SOURCE')
    private readonly dataSource: DataSource,
  ) {
    this.repository = this.dataSource.getRepository(UserEntity);
  }

  async create(user: UserModel): Promise<UserModel> {
    try {
      const persistenceModel = UserMapper.toEntity(user);
      const savedEntity = await this.repository.save(persistenceModel);
      return UserMapper.toDomain(savedEntity);
    } catch (error) {
      console.log('Error al crear el usuario', error.code);
      throw new DatabaseError('Error al crear el usuario');
    }
  }

  async findAll(): Promise<UserModel[]> {
    const entities = await this.repository.find();
    return entities.map(UserMapper.toDomain);
  }

  async findByEmail(email: string): Promise<UserModel | null> {
    const entity = await this.repository.findOne({ where: { email } });
    if (!entity) return null;
    return UserMapper.toDomain(entity);
  }

  async findById(id: string): Promise<UserModel | null> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) return null;
    return UserMapper.toDomain(entity);
  }

  async update(user: UserModel): Promise<UserModel> {
    const persistenceModel = UserMapper.toEntity(user);
    const updatedEntity = await this.repository.save(persistenceModel);
    return UserMapper.toDomain(updatedEntity);
  }

  async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
}
