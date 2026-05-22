import type { AuthUser } from '@portfolio/shared';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const AUTH_STORAGE_KEY = 'portfolio-auth';

interface AuthState {
  readonly accessToken: string | null;
  readonly user: AuthUser | null;
  readonly canEditPortfolio: boolean;
  readonly canManageUsers: boolean;
  setSession: (input: {
    accessToken: string;
    user: AuthUser;
    canEditPortfolio: boolean;
    canManageUsers: boolean;
  }) => void;
  setAccessFlags: (input: { canEditPortfolio: boolean; canManageUsers: boolean }) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      canEditPortfolio: false,
      canManageUsers: false,
      setSession: (input) =>
        set({
          accessToken: input.accessToken,
          user: input.user,
          canEditPortfolio: input.canEditPortfolio,
          canManageUsers: input.canManageUsers,
        }),
      setAccessFlags: (input) =>
        set({
          canEditPortfolio: input.canEditPortfolio,
          canManageUsers: input.canManageUsers,
        }),
      clearSession: () =>
        set({
          accessToken: null,
          user: null,
          canEditPortfolio: false,
          canManageUsers: false,
        }),
    }),
    { name: AUTH_STORAGE_KEY },
  ),
);
