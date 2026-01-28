import { CreateUserUseCase } from "../../application/use-cases/create-user.usecase";
import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserHttpDto } from "./dto/create-user.http.dto";

@Controller('users')
export class UserController {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase
    ) {}

    @Post()
    async createUser(@Body() createUserDto: CreateUserHttpDto) {
        return this.createUserUseCase.execute(createUserDto);
    }
}
