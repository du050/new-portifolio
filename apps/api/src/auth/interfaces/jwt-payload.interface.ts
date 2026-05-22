import type { UserRole } from '@portfolio/shared';

export interface JwtPayload {
  readonly sub: string;
  readonly email: string;
  readonly role: UserRole;
}
