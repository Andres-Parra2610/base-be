import { HttpException, Injectable } from "@nestjs/common";
import { UserRepository } from "src/repositories/users/users.repository";
import * as bcrypt from 'bcryptjs'
import { LoginDto } from "../../dto/auth.dto";
import { JwtPayload } from "../../interfaces/auth.interface";
import { TokenUseCase } from "./token.usecase";


@Injectable()
export class LoginUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenUseCase: TokenUseCase,
  ) { }

  async execute(body: LoginDto) {
    const { email, password } = body;
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new HttpException('Email o contraseña incorrectos', 401);
    }

    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
      throw new HttpException('Email o contraseña incorrectos, password', 401);
    }

    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      typeDocument: user.typeDocument,
    }

    const tokens = await this.tokenUseCase.executeSignIn(payload);

    return {
      user,
      ...tokens,
    }
  }
}