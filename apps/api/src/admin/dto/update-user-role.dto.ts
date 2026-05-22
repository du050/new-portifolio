import { IsEnum } from 'class-validator';
import type { UserRole } from '@portfolio/shared';

const USER_ROLES = ['STANDARD', 'ADMIN', 'SUPER_ADMIN'] as const;

export class UpdateUserRoleDto {
  @IsEnum(USER_ROLES)
  role!: UserRole;
}
