import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRolesDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
