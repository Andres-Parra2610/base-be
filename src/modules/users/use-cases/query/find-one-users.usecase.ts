import { Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "src/repositories/users/users.repository";
import { User } from "../../entities/user.entity";

@Injectable()
export class FindOneUsersUseCase {
  constructor(
    private readonly userRepository: UserRepository
  ) { }

  async execute(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return user;
  }
}
