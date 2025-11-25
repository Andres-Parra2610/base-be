import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { GetUserDto } from './dto/get-user.dto';
import * as Pagination from 'src/utils/pagination';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  async _validateIndentificationNumber(identityDocument: string, email?: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: [
        { identityDocument },
        { email: email || '' }
      ]
    });
    if (user) {
      throw new HttpException('La identificación o el email ya existe', 422);
    }
    return true;
  }

  async createMany(createUserDtos: CreateUserDto[]): Promise<User[]> {
    for (const dto of createUserDtos) {
      await this._validateIndentificationNumber(dto.identityDocument, dto.email);
    }

    // Crear instancias de entidad para cada DTO
    const users = createUserDtos.map(dto => this.userRepository.create(dto));

    // Guardar todas las entidades en la base de datos
    return this.userRepository.save(users);

  }

  // Mantener el método create para compatibilidad con API existente
  async create(createUserDto: CreateUserDto): Promise<User> {
    const users = await this.createMany([createUserDto]);
    return users[0]; // Devolver el primer (y único) usuario creado

  }

  async findAll(q: GetUserDto) {
    const { page, limit } = q;
    const pagination = Pagination.query({ page, limit });
    const [rows, total] = await this.userRepository.findAndCount({
      ...pagination
    })

    return Pagination.get(rows, page, limit, total);

  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return user;
  }


  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    this.userRepository.merge(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(id: string): Promise<{ message: string; user: User }> {
    const user = await this.findOne(id);
    await this.userRepository.softDelete(user);

    return {
      message: 'Usuario eliminado correctamente',
      user
    }
  }


}
