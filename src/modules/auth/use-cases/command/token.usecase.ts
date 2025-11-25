import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtPayload } from "../../interfaces/auth.interface";
import { JwtService } from "@nestjs/jwt";
import { env } from 'src/config/env';
import { RefreshTokenDto } from "../../dto/auth.dto";

@Injectable()
export class TokenUseCase {
  constructor(
    private readonly jwtService: JwtService,
  ) { }

  async executeSignIn(payload: JwtPayload) {
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

  async executeVerifyToken(token: string, secret: string) {
    try {
      const payload: JwtPayload = await this.jwtService.verifyAsync(token, {
        secret,
      });
      return payload;
    } catch (error: any) {
      throw new UnauthorizedException();
    }
  }

  async excuteRefreshToken(body: RefreshTokenDto) {
    const { refreshToken } = body;
    const payload = await this.executeVerifyToken(refreshToken, env.JWT_REFRESH_TOKEN);
    const newTokens = await this.executeSignIn(payload);

    return newTokens

  }
}