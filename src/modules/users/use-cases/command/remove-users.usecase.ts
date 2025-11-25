import { BadRequestException, Injectable } from "@nestjs/common";
import { User } from "../../entities/user.entity";
import { UserRepository } from "src/repositories/users/users.repository";

@Injectable()
export class RemoveUsersUseCase {
  constructor(
    private readonly userRepository: UserRepository
  ) { }


  async execute(id: string): Promise<{ message: string, user: User }> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new BadRequestException('El usuario no existe');
    await this.userRepository.softDelete(id);
    return {
      message: 'Usuario eliminado correctamente',
      user
    }
  }
}