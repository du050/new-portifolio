import { GitBranch, GitCommit, Rocket, ShieldCheck } from 'lucide-react';
import { MonitoringEnterpriseCard } from '@/components/dashboard/monitoring/MonitoringEnterpriseCard';
import type { CicdActivityItem } from '@/lib/devops-monitoring-data';

interface MonitoringCicdFeedProps {
  readonly items: readonly CicdActivityItem[];
}

const TYPE_ICON: Record<CicdActivityItem['type'], React.ElementType> = {
  deploy: Rocket,
  build: GitCommit,
  rollback: GitBranch,
  approval: ShieldCheck,
};

export function MonitoringCicdFeed({ items }: MonitoringCicdFeedProps): React.JSX.Element {
  return (
    <MonitoringEnterpriseCard title="CI/CD activity" description="Recent pipeline and release events">
      <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
        {items.map((item) => {
          const Icon = TYPE_ICON[item.type];
          return (
            <div key={item.id} className="flex gap-3 px-4 py-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-indigo-500/10">
                <Icon className="h-4 w-4 text-indigo-600 dark:text-indigo-300" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium">{item.title}</p>
                  <span className="shrink-0 font-mono text-[10px] text-zinc-400">{item.timestamp}</span>
                </div>
                <p className="mt-1 text-xs text-zinc-500">{item.detail}</p>
                <p className="mt-1 text-[10px] text-zinc-400">@{item.actor}</p>
              </div>
            </div>
          );
        })}
      </div>
    </MonitoringEnterpriseCard>
  );
}
