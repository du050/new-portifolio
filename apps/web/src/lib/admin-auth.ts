import type { LoginResponse } from '@portfolio/shared';
import { ApiClientError, fetchAuthApi, postApi } from '@/lib/api-client';
import { useAuthStore } from '@/stores/auth-store';

const API_UNREACHABLE_MESSAGE =
  'Cannot reach the API. Run `npm run dev` or `npm run dev:api` so the backend is listening on port 3001.';

export interface AdminLoginResult {
  readonly user: LoginResponse['user'];
  readonly canEditPortfolio: boolean;
  readonly canManageUsers: boolean;
}

export async function performAdminLogin(
  email: string,
  password: string,
): Promise<AdminLoginResult> {
  try {
    const login = await postApi<LoginResponse, { email: string; password: string }>('/auth/login', {
      email,
      password,
    });
    useAuthStore.setState({ accessToken: login.accessToken, user: login.user });

    let canEditPortfolio = login.user.role === 'SUPER_ADMIN';
    let canManageUsers = login.user.role === 'SUPER_ADMIN';

    try {
      const access = await fetchAuthApi<{
        canEditPortfolio: boolean;
        canManageUsers: boolean;
      }>('/admin/access');
      canEditPortfolio = access.canEditPortfolio;
      canManageUsers = access.canManageUsers;
    } catch {
      // Keep role-derived flags when /admin/access is temporarily unavailable.
    }

    useAuthStore.getState().setSession({
      accessToken: login.accessToken,
      user: login.user,
      canEditPortfolio,
      canManageUsers,
    });

    return {
      user: login.user,
      canEditPortfolio,
      canManageUsers,
    };
  } catch (error) {
    if (error instanceof TypeError) {
      throw new ApiClientError(API_UNREACHABLE_MESSAGE, 0);
    }
    throw error;
  }
}
