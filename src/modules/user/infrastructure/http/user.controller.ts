import { CreateUserUseCase } from '../../application/use-cases/create-user.usecase';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserUseCase } from '../../application/use-cases/update-user.usecase';
import { DeleteUserUseCase } from '../../application/use-cases/delete-user.usecase';
import { FindOneUserUseCase } from '../../application/use-cases/find-one-user.usecase';
import { FindAllUserUseCase } from '../../application/use-cases/find-all-user.usecase';
import { QueryDto } from '@/src/utils/dto/pagination.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly findOneUserUseCase: FindOneUserUseCase,
    private readonly findAllUserUseCase: FindAllUserUseCase,
  ) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.createUserUseCase.execute(createUserDto);
  }
  @Get()
  async findAllUser(@Query() queryDto: QueryDto) {
    return await this.findAllUserUseCase.execute(queryDto);
  }

  @Get(':id')
  async findOneUser(@Param('id', ParseUUIDPipe) id: string) {
    return await this.findOneUserUseCase.execute(id);
  }

  @Put(':id')
  async updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.updateUserUseCase.execute({ ...updateUserDto, id });
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return await this.deleteUserUseCase.execute(id);
  }
}
