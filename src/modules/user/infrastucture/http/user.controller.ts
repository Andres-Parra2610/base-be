import { CreateUserUseCase } from '../../application/use-cases/create-user.usecase';
import { Body, Controller, Logger, Post } from '@nestjs/common';
import { CreateUserHttpDto } from './dto/create-user.http.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly logger: Logger,
  ) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserHttpDto) {
    try {
      return await this.createUserUseCase.execute(createUserDto);
    } catch (error) {
      //this.logger.error(error);
      throw error;
    }
  }
}
