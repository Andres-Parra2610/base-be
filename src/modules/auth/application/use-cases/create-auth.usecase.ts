import { IAuthRepository } from '../../domain/ports/auth-repository.port';
import { ICreateAuth } from '../interfaces/create-auth.interface';
import { AuthModel } from '../../domain/models/auth.model';
import { generateUuidV4 } from '@/src/utils/uuid-generator';

export class CreateAuthUseCase {
  constructor(private readonly repository: IAuthRepository) {}

  async execute(dto: ICreateAuth): Promise<AuthModel> {
    const entity = new AuthModel({
      id: generateUuidV4(),
      name: dto.name,
    });
    return this.repository.create(entity);
  }
}
