import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsNumber, Matches, IsArray, ValidateNested, ArrayMinSize, IsEmail } from 'class-validator';
import { IsUniqueProperty } from 'src/shared/decorators/unique-property.decorator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  lastname?: string;

  @IsNotEmpty()
  @IsString()
  @Matches(
    /^(([0-9]{7,10})|([0-9]{9}))$/,
    { message: 'identityDocument debe ser un formato válido de RIF o cédula venezolana' }
  )
  identityDocument: string;

  @IsNotEmpty()
  @IsEnum(['V', 'J', 'E', 'G'], { message: 'typeDocument debe ser V, J, E o G' })
  typeDocument: string;

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
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  @IsEnum(['vendedor', 'cliente'], { message: 'userType debe ser vendedor o cliente' })
  userType: string;

  @IsOptional()
  @IsNumber()
  clientTypeId?: number;

  @IsOptional()
  @IsString()
  password?: string;

}


export class CreateManyUserDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateUserDto)
  @IsUniqueProperty({ properties: ['identityDocument'] })
  @ArrayMinSize(1, { message: 'El array debe contener al menos un elemento' })
  items: CreateUserDto[]
}