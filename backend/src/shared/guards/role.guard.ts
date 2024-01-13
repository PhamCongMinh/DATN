import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import {
  IS_PUBLIC_KEY,
  NONE_PERMISSION_KEY,
  ROLE_KEY,
} from '@constants/auth.constant';
import { BadRequestException, Forbidden } from '@shared/exception';
import { EUserRole, User } from '@models/entities/User.entity';
import { ErrorConstant } from '@constants/error.constant';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<EUserRole[]>(
      ROLE_KEY,
      [context.getHandler(), context.getClass()],
    );
    const isPublicApi = this.reflector.getAllAndOverride<EUserRole[]>(
      IS_PUBLIC_KEY,
      [context.getHandler(), context.getClass()],
    );
    const isNonePermission = this.reflector.getAllAndOverride<EUserRole[]>(
      NONE_PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (isPublicApi) return true;
    if (isNonePermission) return true;

    if (!requiredRoles || !requiredRoles.length) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user) return false;
    const { role } = user as User;
    const isCheck = requiredRoles.some((requiredRole) => role === requiredRole);

    if (!isCheck) {
      if (requiredRoles.includes(EUserRole.STUDENT))
        throw new Forbidden({
          message: ErrorConstant.AUTHORIZATION.YOU_DONT_HAVE_ROLE_PROJECT_OWNER,
        });
      if (requiredRoles.includes(EUserRole.TEACHER))
        throw new Forbidden({
          message: ErrorConstant.AUTHORIZATION.YOU_DONT_HAVE_ROLE_INVESTOR,
        });
      if (requiredRoles.includes(EUserRole.SUB_ADMIN))
        throw new Forbidden({
          message: ErrorConstant.AUTHORIZATION.YOU_DONT_HAVE_ROLE_SUB_ADMIN,
        });
      if (requiredRoles.includes(EUserRole.ADMIN))
        throw new Forbidden({
          message: ErrorConstant.AUTHORIZATION.YOU_DONT_HAVE_ROLE_ADMIN,
        });
      throw new Forbidden({
        message: ErrorConstant.AUTHORIZATION.UNAUTHORIZED,
      });
    }

    return isCheck;
  }
}
