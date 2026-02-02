import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { IRolesRepository } from '../../../domain/ports/roles-repository.port';
import { RolesModel } from '../../../domain/models/roles.model';
import { RolesEntity } from '../entities/roles.entity';
import { PaginationResponse } from '@/src/shared/infrastructure/types/pagination.type';
import { QueryDto } from '@/src/utils/dto/pagination.dto';

@Injectable()
export class RolesRepository implements IRolesRepository {
  private readonly repository: Repository<RolesEntity>;

  constructor(
    @Inject('DATA_SOURCE')
    private readonly dataSource: DataSource,
  ) {
    this.repository = dataSource.getRepository(RolesEntity);
  }
  create(entity: RolesModel): Promise<RolesModel> {
    throw new Error('Method not implemented.');
  }
  update(entity: RolesModel): Promise<RolesModel> {
    throw new Error('Method not implemented.');
  }
  delete(id: string, hard?: boolean): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<RolesModel | null> {
    throw new Error('Method not implemented.');
  }
  findAll(queryDto: QueryDto): Promise<PaginationResponse<RolesModel>> {
    throw new Error('Method not implemented.');
  }
}
