import { TokenPayload } from '../interfaces/token-paylaod';

export interface ITokenPort {
  generateToken(payload: TokenPayload): string;
  generateRefreshToken(payload: TokenPayload): string;
  verifyToken(token: string): TokenPayload;
  verifyRefreshToken(token: string): TokenPayload;
}
