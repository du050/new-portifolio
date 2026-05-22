import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardAuthGate } from '@/components/dashboard/DashboardAuthGate';
import { useAuthStore } from '@/stores/auth-store';
import { useDashboardTabStore } from '@/stores/use-dashboard-tab-store';
import { useExperienceModeStore } from '@/stores/use-experience-mode-store';

/** Legacy route — opens enterprise mode; login gate handles unauthenticated users */
export function AdminLoginPage(): React.JSX.Element {
  const navigate = useNavigate();
  const accessToken = useAuthStore((state) => state.accessToken);
  const setMode = useExperienceModeStore((state) => state.setMode);
  const setActiveTab = useDashboardTabStore((state) => state.setActiveTab);

  useEffect(() => {
    setMode('dashboard');
    if (accessToken) {
      setActiveTab('admin');
      navigate('/', { replace: true });
    }
  }, [accessToken, navigate, setActiveTab, setMode]);

  return (
    <DashboardAuthGate>
      <div />
    </DashboardAuthGate>
  );
}
