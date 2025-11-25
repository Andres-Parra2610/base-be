import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateManyUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserDto } from './dto/get-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  /**
   * Crea múltiples usuarios
   * @param createManyUserDto DTO con array de usuarios a crear
   */
  @Post()
  createMany(@Body() createManyUserDto: CreateManyUserDto) {
    return this.usersService.createMany(createManyUserDto.items);
  }


  @Get()
  findAll(@Query() q: GetUserDto) {
    return this.usersService.findAll(q);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
