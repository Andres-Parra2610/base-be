import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FastifyRequest } from 'fastify';
import { DataSource } from 'typeorm';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { ITokenPort } from '@/src/modules/auth/application/ports/token.port';
import { UserRoleEntity } from '@/src/modules/user/infrastucture/persistence/entities/user-role.entity';
import { Logger } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);
  constructor(
    @Inject('TokenService') private readonly tokenService: ITokenPort,
    @Inject('DATA_SOURCE') private readonly dataSource: DataSource,
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
      const payload = this.tokenService.verifyToken(token);

      const userId = payload.id || payload['sub'];
      if (!userId) {
        throw new UnauthorizedException('Invalid token payload');
      }

      const userRole = await this.getUserRole(userId);
      request['user'] = {
        ...payload,
        role: userRole?.role || null,
        permissions: userRole?.role?.permissions || {},
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;
      throw new UnauthorizedException('Invalid token or session');
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
  private async getUserRole(userId: string): Promise<UserRoleEntity | null> {
    const userRoleRepo = this.dataSource.getRepository(UserRoleEntity);
    return await userRoleRepo.findOne({
      where: { userId: userId },
      relations: ['role'],
    });
  }
}
