import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { CreateRolesUseCase } from '../../application/use-cases/create-roles.usecase';
import { FindAllRolesUseCase } from '../../application/use-cases/find-all-roles.usecase';
import { FindOneRolesUseCase } from '../../application/use-cases/find-one-roles.usecase';
import { UpdateRolesUseCase } from '../../application/use-cases/update-roles.usecase';
import { DeleteRolesUseCase } from '../../application/use-cases/delete-roles.usecase';
import { CreateRolesDto } from './dto/create-roles.dto';
import { UpdateRolesDto } from './dto/update-roles.dto';
import { QueryDto } from '@/src/utils/dto/pagination.dto';

@Controller('roles')
export class RolesController {
  constructor(
    private readonly createUseCase: CreateRolesUseCase,
    private readonly findAllUseCase: FindAllRolesUseCase,
    private readonly findOneUseCase: FindOneRolesUseCase,
    private readonly updateUseCase: UpdateRolesUseCase,
    private readonly deleteUseCase: DeleteRolesUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateRolesDto) {
    return await this.createUseCase.execute(dto);
  }

  @Get()
  async findAll(@Query() query: QueryDto) {
    return await this.findAllUseCase.execute(query);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.findOneUseCase.execute(id);
  }

  @Put(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateRolesDto) {
    return await this.updateUseCase.execute({ ...dto, id });
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return await this.deleteUseCase.execute(id);
  }
}
