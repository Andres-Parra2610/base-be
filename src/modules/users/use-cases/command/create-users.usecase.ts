import { Injectable } from "@nestjs/common";
import { CreateManyUsers } from "./create-many-users.usecase";
import { CreateUserDto } from "../../dto/create-user.dto";
import { User } from "../../entities/user.entity";

@Injectable()
export class CreateUsersUseCase {
  constructor(private readonly createManyUserUseCase: CreateManyUsers) { }

  async execute(createUserDto: CreateUserDto): Promise<User> {
    const users = await this.createManyUserUseCase.execute([createUserDto]);
    return users[0];
  }
}