export interface AdminUserRecord {
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly role: import('./auth.types').UserRole;
  readonly isActive: boolean;
  readonly createdAt: string;
}

export interface CreateAdminUserRequest {
  readonly email: string;
  readonly password: string;
  readonly name: string;
  readonly role: import('./auth.types').UserRole;
}
