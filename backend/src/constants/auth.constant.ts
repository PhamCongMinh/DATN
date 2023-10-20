export enum EAuthGuard {
  USER_GUARD = 'userjwt',
  ADMIN_GUARD = 'adminjwt',
  JWT = 'JWT',
}
export const IS_PUBLIC_KEY = 'isPublic';
export const ROLE_KEY = 'roles';
export const NONE_PERMISSION_KEY = 'none_permission';
export const JWT_EXPIRE_IN = '1d';
