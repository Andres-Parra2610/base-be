import { Public } from '@/src/core/decorators/public.decorator';
import { Controller, Get, HttpCode } from '@nestjs/common';
import { RequirePermissions } from '@/src/core/decorators/require-permissions.decorator';
import { PermissionAction, PermissionResource } from '../roles/domain/types/roles.types';

@Controller('healthcheck')
export class HealthCheckController {
  @Get()
  @Public()
  @HttpCode(200)
  check() {
    return {
      status: 'ok',
    };
  }

  @Get('secure')
  @RequirePermissions(PermissionResource.ROLE, PermissionAction.READ)
  @HttpCode(200)
  checkSecure() {
    return {
      status: 'secure ok',
    };
  }
}
