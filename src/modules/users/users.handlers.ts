import { Injectable } from "@nestjs/common";
import { FindOneUsersUseCase } from "./use-cases/query/find-one-users.usecase";
import { EventBus } from "src/shared/modules/event-bus/event-bus.service";
import { User } from "./entities/user.entity";
import { CreateUsersUseCase } from "./use-cases/command/create-users.usecase";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersHandlers {
  constructor(
    private readonly findOneUsersUseCase: FindOneUsersUseCase,
    private readonly createUserUseCase: CreateUsersUseCase,
    private readonly eventBus: EventBus,
  ) {
    this.eventBus.on('find.user', this.findOne.bind(this));
    this.eventBus.on('created.user', this.createUser.bind(this));
  }

  async findOne(payload: { userId: string }): Promise<User | null> {
    return await this.findOneUsersUseCase.execute(payload.userId);
  }

  async createUser(payload: CreateUserDto): Promise<User | null> {
    return await this.createUserUseCase.execute(payload);
  }
}