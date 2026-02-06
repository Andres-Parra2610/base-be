import { IUserRepository } from '../../domain/ports/user-repository.port';
import { QueryDto } from '@/src/utils/dto/pagination.dto';
import { PaginationResponse } from '@/src/shared/infrastructure/types/pagination.type';
import { UserModel } from '../../domain/models/user.model';
import { UserResponse } from '../interfaces/response-user.interface';

import { IRequestUser } from '@/src/core/decorators/user.decorator';

export class FindAllUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(
    queryDto: QueryDto,
    user?: IRequestUser,
  ): Promise<PaginationResponse<UserResponse>> {
    return this.userRepository.findAll(queryDto, user);
  }
}
