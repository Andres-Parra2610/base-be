import { CreateUserUseCase } from '../../application/use-cases/create-user.usecase';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserHttpDto } from './dto/create-user.http.dto';

@Controller('user')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserHttpDto) {
    return await this.createUserUseCase.execute(createUserDto);
  }
}
