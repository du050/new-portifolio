import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import type { DashboardMetric } from '@/lib/dashboard-data';
import { cn } from '@/lib/utils';

interface DashboardMetricCardProps {
  readonly metric: DashboardMetric;
}

export function DashboardMetricCard({
  metric,
}: DashboardMetricCardProps): React.JSX.Element {
  const TrendIcon =
    metric.trend === 'up'
      ? ArrowUpRight
      : metric.trend === 'down'
        ? ArrowDownRight
        : Minus;

  return (
    <Card className="border-border/80 bg-card shadow-sm">
      <CardContent className="p-4">
        <p className="text-xs font-medium text-muted-foreground">{metric.label}</p>
        <p className="mt-2 font-mono text-2xl font-bold tracking-tight">{metric.value}</p>
        <div
          className={cn(
            'mt-2 flex items-center gap-1 text-xs',
            metric.trend === 'up' && 'text-emerald-600 dark:text-emerald-400',
            metric.trend === 'down' && 'text-amber-600 dark:text-amber-400',
            metric.trend === 'neutral' && 'text-muted-foreground',
          )}
        >
          <TrendIcon className="h-3 w-3" aria-hidden="true" />
          {metric.change}
        </div>
      </CardContent>
    </Card>
  );
}
