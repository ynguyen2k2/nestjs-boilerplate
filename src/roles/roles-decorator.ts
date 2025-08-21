import { SetMetadata } from '@nestjs/common'
import { ROLES_KEY } from './roles-enum'

export const Roles = (...roles: number[]) => SetMetadata(ROLES_KEY, roles)
