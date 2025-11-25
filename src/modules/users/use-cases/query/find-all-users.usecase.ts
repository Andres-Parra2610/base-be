import { Injectable } from "@nestjs/common";
import { GetUserDto } from "../../dto/get-user.dto";
import * as Pagination from 'src/utils/pagination';
import { UserRepository } from "src/repositories/users/users.repository";


@Injectable()
export class FindAllUsersUseCase {
  constructor(
    private readonly userRepository: UserRepository
  ) { }

  async execute(q: GetUserDto) {
    const { page, limit } = q;
    const pagination = Pagination.query({ page, limit });
    const [rows, total] = await this.userRepository.findAndCount({
      ...pagination
    })

    return Pagination.get(rows, page, limit, total);
  }
}
