import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { applyDashboardDeepLink } from '@/lib/project-demo-links';

export function useDashboardDeepLink(): void {
  const location = useLocation();

  useEffect(() => {
    if (!location.search) {
      return;
    }
    applyDashboardDeepLink(location.search);
  }, [location.search]);
}
