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
import { CreateAuthUseCase } from '../../application/use-cases/create-auth.usecase';
import { FindAllAuthUseCase } from '../../application/use-cases/find-all-auth.usecase';
import { FindOneAuthUseCase } from '../../application/use-cases/find-one-auth.usecase';
import { UpdateAuthUseCase } from '../../application/use-cases/update-auth.usecase';
import { DeleteAuthUseCase } from '../../application/use-cases/delete-auth.usecase';
import { QueryDto } from '@/src/utils/dto/pagination.dto';
import { LoginAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly createUseCase: CreateAuthUseCase) {}

  @Post()
  async create(@Body() dto: LoginAuthDto) {}
}
