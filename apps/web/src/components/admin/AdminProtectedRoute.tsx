import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth-store';

export function AdminProtectedRoute(): React.JSX.Element {
  const accessToken = useAuthStore((state) => state.accessToken);

  if (!accessToken) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
