import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class RefreshTokenDto {

  @IsNotEmpty()
  refreshToken: string;
}