import { QueryDto } from '@/src/utils/dto/pagination.dto';
import { PaginationResponse } from '@/src/shared/infrastructure/types/pagination.type';
import { UserModel } from '../../domain/models/user.model';
import { IUserQueryRepository } from '../../domain/ports/user-query-repository.port';

export class FindAllUserUseCase {
  constructor(private readonly userRepository: IUserQueryRepository) {}

  async execute(queryDto: QueryDto): Promise<PaginationResponse<UserModel>> {
    return this.userRepository.findAll(queryDto);
  }
}
