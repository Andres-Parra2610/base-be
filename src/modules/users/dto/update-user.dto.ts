import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEnum, IsOptional, IsString, IsNumber, Matches } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  @Matches(
    /^(([0-9]{7,10})|([0-9]{9}))$/,
    { message: 'identityDocument debe ser un formato válido de RIF o cédula venezolana' }
  )
  identityDocument?: string;

  @IsOptional()
  @IsEnum(['V', 'J', 'E', 'G'], { message: 'typeDocument debe ser V, J, E o G' })
  typeDocument?: string;

  @IsOptional()
  @IsString()
  cityId?: string;

  @IsOptional()
  @IsString()
  stateId?: string;

  @IsOptional()
  @IsString()
  physicalAddress?: string;

  @IsOptional()
  @IsString()
  contactNumber?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsEnum(['vendedor', 'cliente'], { message: 'userType debe ser vendedor o cliente' })
  userType?: string;

  @IsOptional()
  @IsNumber()
  clientTypeId?: number;
}
