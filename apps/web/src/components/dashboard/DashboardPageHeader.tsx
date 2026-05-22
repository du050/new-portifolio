import type { DashboardTabId } from '@/lib/dashboard-tabs';
import { DASHBOARD_TABS } from '@/lib/dashboard-tabs';

interface DashboardPageHeaderProps {
  readonly tabId: DashboardTabId;
  readonly description?: string;
}

export function DashboardPageHeader({
  tabId,
  description,
}: DashboardPageHeaderProps): React.JSX.Element {
  const tab = DASHBOARD_TABS.find((item) => item.id === tabId);
  const title = tab?.label ?? 'Dashboard';

  return (
    <div className="mb-6">
      <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
        Enterprise Dashboard
      </p>
      <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
      {description && (
        <p className="mt-2 max-w-3xl text-sm text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
      )}
    </div>
  );
}
