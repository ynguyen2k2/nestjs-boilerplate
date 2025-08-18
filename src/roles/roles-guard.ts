import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ROLES_KEY, ValidRole } from './roles-enum'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<ValidRole[]>(ROLES_KEY, [
      context.getClass(),
      context.getHandler(),
    ])
    if (!roles.length) {
      return true
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = context.switchToHttp().getRequest()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const userRoleId = request.user?.role?.id
    if (!userRoleId) {
      return false
    }

    return roles.map(String).includes(String(userRoleId))
  }
}
