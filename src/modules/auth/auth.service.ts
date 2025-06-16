import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto, RefreshTokenDto } from './dto/auth.dto';
import { JwtPayload } from './interfaces/auth.interface';
import { JwtService } from '@nestjs/jwt';
import { env } from 'src/config/env';
import { UserRepository } from '../users/user.repository';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) { }


  async signTokens(payload: JwtPayload) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: env.JWT_SECRET,
        expiresIn: '1d',
      }),
      this.jwtService.signAsync(payload, {
        secret: env.JWT_REFRESH_TOKEN,
        expiresIn: '7d',
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async verifyToken(token: string, secret: string) {
    try {
      const payload: JwtPayload = await this.jwtService.verifyAsync(token, {
        secret,
      });
      return payload;
    } catch (error: any) {
      throw new UnauthorizedException();
    }
  }

  async login(body: LoginDto) {
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
      name: user.name,
      typeDocument: user.typeDocument,
      userType: user.userType,
    }

    const tokens = await this.signTokens(payload);

    return {
      user,
      ...tokens,
    }
  }

  async refreshToken(body: RefreshTokenDto) {
    const { refreshToken } = body;
    const payload = await this.verifyToken(refreshToken, env.JWT_REFRESH_TOKEN);
    const newTokens = await this.signTokens(payload);

    return newTokens

  }
}
