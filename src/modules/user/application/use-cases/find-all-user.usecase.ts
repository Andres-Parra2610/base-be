import { IUserRepository } from '../../domain/ports/user-repository.port';
import { QueryDto } from '@/src/utils/dto/pagination.dto';
import { PaginationResponse } from '@/src/shared/infrastructure/types/pagination.type';
import { UserModel } from '../../domain/models/user.model';
import { UserResponse } from '../interfaces/response-user.interface';

export class FindAllUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(queryDto: QueryDto): Promise<PaginationResponse<UserResponse>> {
    return this.userRepository.findAll(queryDto);
  }
}
