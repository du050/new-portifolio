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
    <div className="mb-5 flex flex-col gap-2 border-b border-zinc-200 pb-4 dark:border-zinc-800 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
          Enterprise Dashboard
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
      </div>
      {description && (
        <p className="max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
      )}
    </div>
  );
}
