import { SetMetadata } from '@nestjs/common'
import { ROLES_KEY, ValidRole } from './roles-enum'

export const Roles = (...roles: ValidRole[]) => SetMetadata(ROLES_KEY, roles)
