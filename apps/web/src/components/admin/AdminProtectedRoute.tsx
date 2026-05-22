import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth-store';
import { useExperienceModeStore } from '@/stores/use-experience-mode-store';

export function AdminProtectedRoute(): React.JSX.Element {
  const accessToken = useAuthStore((state) => state.accessToken);
  const setMode = useExperienceModeStore((state) => state.setMode);

  useEffect(() => {
    setMode('dashboard');
  }, [setMode]);

  if (!accessToken) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
