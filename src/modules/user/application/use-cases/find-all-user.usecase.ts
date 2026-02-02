import { IUserRepository } from '../../domain/ports/user-repository.port';
import { QueryDto } from '@/src/utils/dto/pagination.dto';
import { FindAllResponse } from '@/src/shared/infrastructure/types/pagination.type';
import { UserModel } from '../../domain/models/user.model';

export class FindAllUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(queryDto: QueryDto): Promise<FindAllResponse<UserModel>> {
    return this.userRepository.findAll(queryDto);
  }
}
