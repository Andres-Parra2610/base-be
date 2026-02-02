import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FastifyRequest } from 'fastify';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { ITokenPort } from '@/src/modules/auth/application/ports/token.port';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject('TokenService') private readonly tokenService: ITokenPort,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      // We verify the access token specifically
      const payload = this.tokenService.verifyToken(token);
      // Attach user payload to request for downstream use
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
    return true;
  }

  private extractToken(request: FastifyRequest): string | undefined {
    // 1. Check Authorization Header (Standard for Mobile/API)
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    if (type === 'Bearer') {
      return token;
    }

    // 2. Check Cookie (Standard for Web)
    // cast to any to avoid TS issues with fastify types if cookie plugin augmentation isn't picked up
    const cookies = (request as any).cookies;
    if (cookies && cookies.access_token) {
      return cookies.access_token;
    }

    return undefined;
  }
}
