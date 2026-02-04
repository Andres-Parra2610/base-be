import { IsString, IsNotEmpty, IsBoolean, IsEnum, IsObject, IsOptional } from 'class-validator';
import { AppPermissions, ContextType } from '../../../domain/types/roles.types';

export class CreateRolesDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(ContextType)
  @IsNotEmpty()
  contextType: ContextType;

  @IsObject()
  @IsNotEmpty()
  permissions: AppPermissions;

  @IsString()
  @IsOptional()
  contextId?: string;

  @IsBoolean()
  @IsNotEmpty()
  canDelete: boolean = true;
}
