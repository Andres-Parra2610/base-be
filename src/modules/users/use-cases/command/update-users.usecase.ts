import { BadRequestException, Injectable } from "@nestjs/common";
import { UpdateUserDto } from "../../dto/update-user.dto";
import { User } from "../../entities/user.entity";
import { UserRepository } from "src/repositories/users/users.repository";

@Injectable()
export class UpdateUsersUseCase {
  constructor(
    private readonly userRepository: UserRepository
  ) { }


  async execute(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new BadRequestException('El usuario no existe');
    this.userRepository.merge(user, updateUserDto);
    return this.userRepository.save(user);
  }
}