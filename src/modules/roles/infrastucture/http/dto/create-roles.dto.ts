import { IsString, IsNotEmpty, IsBoolean, IsObject, IsOptional } from 'class-validator';
import { AppPermissions } from '../../../domain/types/roles.types';

export class CreateRolesDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsObject()
  @IsNotEmpty()
  permissions: AppPermissions;

  @IsBoolean()
  @IsOptional()
  canDelete: boolean = true;
}
