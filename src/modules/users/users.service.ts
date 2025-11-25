import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { GetUserDto } from './dto/get-user.dto';
import { CreateUsersUseCase } from './use-cases/command/create-users.usecase';
import { FindAllUsersUseCase } from './use-cases/query/find-all-users.usecase';
import { FindOneUsersUseCase } from './use-cases/query/find-one-users.usecase';
import { UpdateUsersUseCase } from './use-cases/command/update-users.usecase';
import { RemoveUsersUseCase } from './use-cases/command/remove-users.usecase';
import { CreateManyUsers } from './use-cases/command/create-many-users.usecase';

@Injectable()
export class UsersService {
  constructor(
    private readonly createManyUsersUseCase: CreateManyUsers,
    private readonly createUserUseCase: CreateUsersUseCase,
    private readonly findAllUsersUseCase: FindAllUsersUseCase,
    private readonly findOneUsersUseCase: FindOneUsersUseCase,
    private readonly updateUsersUseCase: UpdateUsersUseCase,
    private readonly removeUsersUseCase: RemoveUsersUseCase,
  ) { }


  async createMany(createUserDtos: CreateUserDto[]): Promise<User[]> {
    return this.createManyUsersUseCase.execute(createUserDtos);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.createUserUseCase.execute(createUserDto);
  }

  async findAll(q: GetUserDto) {
    return this.findAllUsersUseCase.execute(q);
  }

  async findOne(id: string): Promise<User> {
    return this.findOneUsersUseCase.execute(id);
  }


  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.updateUsersUseCase.execute(id, updateUserDto);
  }

  async remove(id: string): Promise<{ message: string; user: User }> {
    return this.removeUsersUseCase.execute(id);
  }


}
