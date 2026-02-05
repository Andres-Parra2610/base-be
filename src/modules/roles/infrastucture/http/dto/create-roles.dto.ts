import { IsString, IsNotEmpty, IsBoolean, IsObject, IsOptional, MaxLength } from 'class-validator';
import { AppPermissions } from '../../../domain/types/roles.types';
import { SanitizeString } from '@/src/core/decorators/sanitize-string.decorator';

export class CreateRolesDto {
  @IsString()
  @IsNotEmpty()
  @SanitizeString()
  name: string;

  @IsObject()
  @IsNotEmpty()
  permissions: AppPermissions;

  @IsBoolean()
  @IsOptional()
  canDelete: boolean = true;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  description?: string;
}
