import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboardTabStore } from '@/stores/use-dashboard-tab-store';
import { useExperienceModeStore } from '@/stores/use-experience-mode-store';

/** Legacy route — redirects to enterprise dashboard Admin tab */
export function AdminPanelPage(): React.JSX.Element | null {
  const navigate = useNavigate();
  const setMode = useExperienceModeStore((state) => state.setMode);
  const setActiveTab = useDashboardTabStore((state) => state.setActiveTab);

  useEffect(() => {
    setMode('dashboard');
    setActiveTab('admin');
    navigate('/', { replace: true });
  }, [navigate, setActiveTab, setMode]);

  return null;
}
