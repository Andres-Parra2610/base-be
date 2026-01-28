import { IsBoolean, IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserHttpDto {
    @IsString()
    @MinLength(3)
    fullName: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsBoolean()
    @IsOptional()
    isStaff: boolean = false;
}