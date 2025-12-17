export const ROLES_KEY = 'roles'
export enum RoleEnum {
  ADMIN = 1,
  USER = 2,
  MODERATOR = 3,
}
export type ValidRole = RoleEnum.ADMIN | RoleEnum.USER | RoleEnum.MODERATOR
