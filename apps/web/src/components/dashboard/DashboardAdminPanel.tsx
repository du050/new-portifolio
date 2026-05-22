import { PortfolioAdminEditor } from '@/components/admin/PortfolioAdminEditor';
import { DashboardPageHeader } from '@/components/dashboard/DashboardPageHeader';
import { useAuthStore } from '@/stores/auth-store';

export function DashboardAdminPanel(): React.JSX.Element {
  const canEditPortfolio = useAuthStore((state) => state.canEditPortfolio);

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        tabId="admin"
        description={
          canEditPortfolio
            ? 'Edits auto-save and reflect across the portfolio immediately.'
            : 'Read-only preview of portfolio content. Owner Super Admin can save changes.'
        }
      />
      <PortfolioAdminEditor variant="enterprise" />
    </div>
  );
}
