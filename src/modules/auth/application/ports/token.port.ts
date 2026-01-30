import { TokenPayload } from '../interfaces/token-paylaod';

export interface ITokenPort {
  generateToken(payload: TokenPayload): string;
  verifyToken(token: string): TokenPayload;
}
