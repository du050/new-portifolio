import { GitCommit, GraduationCap, Rocket, TriangleAlert } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import type { ActivityItem } from '@/lib/dashboard-data';

interface ActivityFeedProps {
  readonly items: readonly ActivityItem[];
}

const TYPE_ICONS: Record<ActivityItem['type'], React.ElementType> = {
  deploy: Rocket,
  commit: GitCommit,
  alert: TriangleAlert,
  learning: GraduationCap,
  project: Rocket,
};

export function ActivityFeed({ items }: ActivityFeedProps): React.JSX.Element {
  return (
    <Card className="rounded-md border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <CardHeader className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
        <CardTitle className="text-sm font-semibold">Activity Feed</CardTitle>
      </CardHeader>
      <CardContent className="divide-y divide-zinc-100 p-0 dark:divide-zinc-800">
        {items.map((item) => {
          const Icon = TYPE_ICONS[item.type];
          return (
            <div
              key={item.id}
              className="flex gap-3 px-4 py-3"
            >
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-indigo-500/10">
                <Icon className="h-4 w-4 text-indigo-600 dark:text-indigo-300" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium">{item.title}</p>
                  <span className="shrink-0 font-mono text-[10px] text-muted-foreground">
                    {item.timestamp}
                  </span>
                </div>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-zinc-500">
                  {item.detail}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
