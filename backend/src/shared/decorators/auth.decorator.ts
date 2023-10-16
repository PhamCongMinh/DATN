import { IS_PUBLIC_KEY } from '@constants/auth.constant';
import { ROLE_KEY } from '@constants/auth.constant';
import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@shared/guards/auth.guard';
import { RolesGuard } from '@shared/guards/role.guard';
import { EUserRole } from '@models/entities/User.entity';

export const Roles = (role: EUserRole[]) => SetMetadata(ROLE_KEY, role);
export const PublicApi = () => {
  return SetMetadata(IS_PUBLIC_KEY, true);
};

export const UseAdminAuth = () => {
  return applyDecorators(
    UseGuards(JwtAuthGuard, RolesGuard),
    Roles([EUserRole.ADMIN]),
    ApiBearerAuth(),
  );
};

export const UseAuth = (roles: EUserRole[]) => {
  return applyDecorators(
    UseGuards(JwtAuthGuard, RolesGuard),
    Roles(roles),
    ApiBearerAuth('jwt'),
  );
};
