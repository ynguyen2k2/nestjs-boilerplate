export const ROLES_KEY = 'roles'
export enum RoleEnum {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator',
}
export type ValidRole = RoleEnum.ADMIN | RoleEnum.USER | RoleEnum.MODERATOR
