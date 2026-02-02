import { ITokenPort } from '../../application/ports/token.port';
import { TokenPayload } from '../../application/interfaces/token-paylaod';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { env } from '@/src/config/env';
import { NODE_ENV } from '@/src/shared/types/node_env.type';

@Injectable()
export class JwtTokenService implements ITokenPort {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(payload: TokenPayload): string {
    return this.jwtService.sign(payload, {
      expiresIn: env.NODE_ENV === NODE_ENV.DEVELOPMENT ? '7d' : '15m',
      secret: env.JWT_SECRET,
    });
  }

  generateRefreshToken(payload: TokenPayload): string {
    return this.jwtService.sign(payload, {
      secret: env.JWT_REFRESH_TOKEN,
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
