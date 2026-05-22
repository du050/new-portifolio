import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AdminSignInCard } from '@/components/admin/AdminSignInCard';
import { useAuthStore } from '@/stores/auth-store';
import { useDashboardTabStore } from '@/stores/use-dashboard-tab-store';
import { useExperienceModeStore } from '@/stores/use-experience-mode-store';

export function AdminLoginPage(): React.JSX.Element {
  const navigate = useNavigate();
  const accessToken = useAuthStore((state) => state.accessToken);
  const setMode = useExperienceModeStore((state) => state.setMode);
  const setActiveTab = useDashboardTabStore((state) => state.setActiveTab);

  const openEnterpriseAdmin = (): void => {
    setMode('dashboard');
    setActiveTab('admin');
    navigate('/');
  };

  useEffect(() => {
    if (accessToken) {
      openEnterpriseAdmin();
    }
  }, [accessToken, navigate, setActiveTab, setMode]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-950 via-violet-950/30 to-zinc-950 px-4">
      <div className="w-full max-w-md">
        <AdminSignInCard variant="standalone" onSuccess={openEnterpriseAdmin} />
        <p className="mt-6 text-center text-xs text-zinc-500">
          <Link to="/" className="text-violet-300 hover:underline">
            Back to portfolio
          </Link>
          {' · '}
          <button
            type="button"
            className="text-violet-300 hover:underline"
            onClick={() => {
              setMode('dashboard');
              setActiveTab('admin');
              navigate('/');
            }}
          >
            Open enterprise admin tab
          </button>
        </p>
      </div>
    </div>
  );
}
