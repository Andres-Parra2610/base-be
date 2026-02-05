import { IsString, IsNotEmpty, IsBoolean, IsObject, IsOptional, MaxLength } from 'class-validator';
import { AppPermissions } from '../../../domain/types/roles.types';
import { Transform } from 'class-transformer';

export class CreateRolesDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.trim().toLowerCase())
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
