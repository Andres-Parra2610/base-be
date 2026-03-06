import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY, RequiredPermission } from '../decorators/require-permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermission = this.reflector.getAllAndOverride<RequiredPermission>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermission) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado en el contexto');
    }

    if (!user.role || !user.permissions) {
      throw new ForbiddenException('El usuario no tiene un rol asignado');
    }

    const rolePermissions = user.permissions;

    // Check if role has permission for resource and action
    const resourcePermissions = rolePermissions[requiredPermission.resource];
    if (!resourcePermissions || !resourcePermissions[requiredPermission.action]) {
      throw new ForbiddenException(`No tienes permisos para acceder a este recurso`);
    }

    return true;
  }
}
