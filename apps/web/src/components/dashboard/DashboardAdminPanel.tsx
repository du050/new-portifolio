import { LogOut } from 'lucide-react';
import { PortfolioAdminEditor } from '@/components/admin/PortfolioAdminEditor';
import { AdminSignInCard } from '@/components/admin/AdminSignInCard';
import { DashboardPageHeader } from '@/components/dashboard/DashboardPageHeader';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/stores/auth-store';

export function DashboardAdminPanel(): React.JSX.Element {
  const accessToken = useAuthStore((state) => state.accessToken);
  const user = useAuthStore((state) => state.user);
  const canEditPortfolio = useAuthStore((state) => state.canEditPortfolio);
  const clearSession = useAuthStore((state) => state.clearSession);

  const handleLogout = (): void => {
    clearSession();
  };

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        tabId="admin"
        description="Edit variable names and values (skills, metrics, slugs). Only your owner Super Admin account from server .env can save; Standard and Admin are read-only."
      />

      {!accessToken ? (
        <AdminSignInCard variant="enterprise" />
      ) : (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
            <div>
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{user?.name}</p>
              <p className="text-xs text-zinc-500">
                {user?.email} · <span className="text-indigo-600 dark:text-indigo-300">{user?.role}</span>
                {canEditPortfolio ? ' · can edit' : ' · read-only'}
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              Sign out
            </Button>
          </div>
          <PortfolioAdminEditor variant="enterprise" />
        </div>
      )}
    </div>
  );
}
