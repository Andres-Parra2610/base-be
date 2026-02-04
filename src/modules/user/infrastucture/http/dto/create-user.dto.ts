import { fullNameRegex } from '@/src/utils/regex/validators.regex';
import {
  IsBoolean,
  IsDefined,
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  @Matches(fullNameRegex)
  fullName: string;

  @IsDefined()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsBoolean()
  @IsOptional()
  isStaff: boolean = false;

  @IsUUID('4')
  roleId: string;
}
