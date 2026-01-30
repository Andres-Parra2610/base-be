import { ITokenPort } from '../../application/ports/token.port';
import { TokenPayload } from '../../application/interfaces/token-paylaod';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { env } from '@/src/config/env';

@Injectable()
export class JwtTokenService implements ITokenPort {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(payload: TokenPayload): string {
    return this.jwtService.sign(payload, { expiresIn: '15m' });
  }

  generateRefreshToken(payload: TokenPayload): string {
    return this.jwtService.sign(payload, {
      secret: env.JWT_REFRESH_TOKEN,
      expiresIn: '7d',
    });
  }

  verifyToken(token: string): TokenPayload {
    return this.jwtService.verify(token);
  }

  verifyRefreshToken(token: string): TokenPayload {
    return this.jwtService.verify(token, {
      secret: env.JWT_REFRESH_TOKEN,
    });
  }
}
