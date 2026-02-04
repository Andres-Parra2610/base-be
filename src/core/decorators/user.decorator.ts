import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TokenPayload } from '@/src/modules/auth/application/interfaces/token-paylaod';
import { RolesEntity } from '@/src/modules/roles/infrastucture/persistence/entities/roles.entity';
import { AppPermissions } from '@/src/modules/roles/domain/types/roles.types';

export interface IRequestUser extends TokenPayload {
  role: RolesEntity | null;
  permissions: AppPermissions;
}

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
