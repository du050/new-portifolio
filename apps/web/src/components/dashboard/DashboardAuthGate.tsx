import { ArrowLeft, LayoutDashboard } from 'lucide-react';
import { AdminSignInCard } from '@/components/admin/AdminSignInCard';
import { ExperienceModeSwitch } from '@/components/experience/ExperienceModeSwitch';
import { Button } from '@/components/ui/Button';
import { useExperienceModeStore } from '@/stores/use-experience-mode-store';
import { useAuthStore } from '@/stores/auth-store';

interface DashboardAuthGateProps {
  readonly children: React.ReactNode;
}

export function DashboardAuthGate({ children }: DashboardAuthGateProps): React.JSX.Element {
  const accessToken = useAuthStore((state) => state.accessToken);
  const setMode = useExperienceModeStore((state) => state.setMode);

  if (accessToken) {
    return <>{children}</>;
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#f5f7fb] px-4 py-12 dark:bg-zinc-950">
      <div className="absolute top-4 right-4 flex items-center gap-3 sm:top-6 sm:right-6">
        <ExperienceModeSwitch variant="compact" />
      </div>

      <div className="mb-8 flex flex-col items-center text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300">
          <LayoutDashboard className="h-6 w-6" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Enterprise sign in
        </h1>
        <p className="mt-2 max-w-sm text-sm text-zinc-600 dark:text-zinc-400">
          Sign in to open the dashboard workspace. Standard and Admin roles are read-only; owner
          Super Admin can edit portfolio data.
        </p>
      </div>

      <div className="w-full max-w-md">
        <AdminSignInCard variant="enterprise" />
      </div>

      <Button
        type="button"
        variant="ghost"
        className="mt-8"
        onClick={() => setMode('creative')}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to public portfolio
      </Button>
    </div>
  );
}
