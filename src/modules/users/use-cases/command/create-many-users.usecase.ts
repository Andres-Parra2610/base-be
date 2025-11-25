import { Injectable } from "@nestjs/common";
import { UserIdentificationValidator } from "../../validators/user-identification.validator";
import { CreateUserDto } from "../../dto/create-user.dto";
import { User } from "../../entities/user.entity";
import { UserRepository } from "src/repositories/users/users.repository";
import * as bcrypt from 'bcryptjs'


@Injectable()
export class CreateManyUsers {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userIdentificationValidator: UserIdentificationValidator,
  ) { }

  async execute(createUserDtos: CreateUserDto[]): Promise<User[]> {
    for (const dto of createUserDtos) {
      await this.userIdentificationValidator.execute(dto.identityDocument, dto.email);
    }

    const users = createUserDtos.map(dto => this.userRepository.create({
      ...dto,
      password: bcrypt.hashSync(dto.password, 10)
    }));

    return this.userRepository.save(users);
  }
}