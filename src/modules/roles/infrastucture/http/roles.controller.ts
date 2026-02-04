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
import { CreateRolesUseCase } from '../../application/use-cases/create-roles.usecase';
import { FindAllRolesUseCase } from '../../application/use-cases/find-all-roles.usecase';
import { FindOneRolesUseCase } from '../../application/use-cases/find-one-roles.usecase';
import { UpdateRolesUseCase } from '../../application/use-cases/update-roles.usecase';
import { DeleteRolesUseCase } from '../../application/use-cases/delete-roles.usecase';
import { CreateRolesDto } from './dto/create-roles.dto';
import { UpdateRolesDto } from './dto/update-roles.dto';
import { QueryDto } from '@/src/utils/dto/pagination.dto';
import { RequirePermissions } from '@/src/core/decorators/require-permissions.decorator';
import { PermissionAction, PermissionResource } from '../../domain/types/roles.types';
import { IRequestUser, User } from '@/src/core/decorators/user.decorator';

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
  @RequirePermissions(PermissionResource.ROLE, PermissionAction.CREATE)
  async create(@Body() dto: CreateRolesDto, @User() user: IRequestUser) {
    const role = {
      ...dto,
      contextId: user.role?.contextId,
    };
    return await this.createUseCase.execute(role);
  }

  @Get()
  @RequirePermissions(PermissionResource.ROLE, PermissionAction.READ)
  async findAll(@Query() query: QueryDto, @User() user: IRequestUser) {
    return await this.findAllUseCase.execute(query, user);
  }

  @Get(':id')
  @RequirePermissions(PermissionResource.ROLE, PermissionAction.READ)
  async findOne(@Param('id', ParseUUIDPipe) id: string, @User() user: IRequestUser) {
    return await this.findOneUseCase.execute(id, user);
  }

  @Put(':id')
  @RequirePermissions(PermissionResource.ROLE, PermissionAction.UPDATE)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateRolesDto,
    @User() user: IRequestUser,
  ) {
    const role = {
      ...dto,
      contextId: user.role?.contextId,
    };
    return await this.updateUseCase.execute({ ...role, id });
  }

  @Delete(':id')
  @RequirePermissions(PermissionResource.ROLE, PermissionAction.DELETE)
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return await this.deleteUseCase.execute(id);
  }
}
