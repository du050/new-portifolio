import type { UserRole } from '@portfolio/shared';

export interface DemoRoleCredential {
  readonly email: string;
  readonly password: string;
  readonly label: string;
}

export const DEMO_QUICK_LOGIN_ROLES = ['STANDARD', 'ADMIN'] as const;

export type DemoQuickLoginRole = (typeof DEMO_QUICK_LOGIN_ROLES)[number];

export const DEMO_ROLE_CREDENTIALS: Record<DemoQuickLoginRole, DemoRoleCredential> = {
  STANDARD: {
    email: 'viewer@portfolio.dev',
    password: 'Viewer123!',
    label: 'Standard',
  },
  ADMIN: {
    email: 'admin@portfolio.dev',
    password: 'Admin123!',
    label: 'Admin',
  },
} as const;

export const SUPER_ADMIN_DEMO_LABEL = 'Super Admin';

export function isDemoQuickLoginRole(role: UserRole): role is DemoQuickLoginRole {
  return role === 'STANDARD' || role === 'ADMIN';
}
