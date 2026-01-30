import { ITokenPort } from '../../application/ports/token.port';
import { TokenPayload } from '../../application/interfaces/token-paylaod';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenService implements ITokenPort {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(payload: TokenPayload): string {
    return this.jwtService.sign(payload);
  }

  verifyToken(token: string): TokenPayload {
    return this.jwtService.verify(token);
  }
}
