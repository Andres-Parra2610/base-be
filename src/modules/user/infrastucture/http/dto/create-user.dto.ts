import { fullNameRegex } from '@/src/utils/regex/validators.regex';
import {
  IsBoolean,
  IsDefined,
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @Matches(fullNameRegex)
  fullName: string;

  @IsDefined()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsBoolean()
  @IsOptional()
  isStaff: boolean = false;
}
