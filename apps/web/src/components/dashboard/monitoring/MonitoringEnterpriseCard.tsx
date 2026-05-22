import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { MONITORING_CARD_CLASS } from '@/components/dashboard/monitoring/monitoring-utils';

interface MonitoringEnterpriseCardProps {
  readonly title: string;
  readonly description?: string;
  readonly children: React.ReactNode;
  readonly action?: React.ReactNode;
}

export function MonitoringEnterpriseCard({
  title,
  description,
  children,
  action,
}: MonitoringEnterpriseCardProps): React.JSX.Element {
  return (
    <Card className={MONITORING_CARD_CLASS} interactive={false}>
      <CardHeader className="flex flex-row items-start justify-between gap-3 border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
        <div>
          <CardTitle className="text-sm font-semibold">{title}</CardTitle>
          {description ? (
            <p className="mt-1 text-xs text-zinc-500">{description}</p>
          ) : null}
        </div>
        {action}
      </CardHeader>
      <CardContent className="p-0">{children}</CardContent>
    </Card>
  );
}
