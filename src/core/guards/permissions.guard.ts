import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { PERMISSIONS_KEY, RequiredPermission } from '../decorators/require-permissions.decorator';
import { UserRoleEntity } from '@/src/modules/user/infrastucture/persistence/entities/user-role.entity';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject('DATA_SOURCE') private dataSource: DataSource,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermission = this.reflector.getAllAndOverride<RequiredPermission>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermission) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user || !user.id) {
      throw new UnauthorizedException('User not found in context');
    }

    // Fetch User Role and Permissions
    const userRoleRepo = this.dataSource.getRepository(UserRoleEntity);
    const userRole = await userRoleRepo.findOne({
      where: { userId: user.id },
      relations: ['role'],
    });

    if (!userRole || !userRole.role) {
      throw new ForbiddenException('User has no assigned role');
    }

    const rolePermissions = userRole.role.permissions;

    // Check if role has permission for resource and action
    const resourcePermissions = rolePermissions[requiredPermission.resource];
    if (!resourcePermissions || !resourcePermissions[requiredPermission.action]) {
      throw new ForbiddenException(
        `Insufficient permissions for ${requiredPermission.resource}:${requiredPermission.action}`,
      );
    }

    return true;
  }
}
