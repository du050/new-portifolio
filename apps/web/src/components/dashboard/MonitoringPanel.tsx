import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import type { LogEntry, ServiceHealth } from '@/lib/dashboard-data';
import { cn } from '@/lib/utils';

interface MonitoringPanelProps {
  readonly services: readonly ServiceHealth[];
  readonly logs: readonly LogEntry[];
}

const STATUS_COLORS: Record<ServiceHealth['status'], string> = {
  healthy: 'bg-emerald-500',
  degraded: 'bg-amber-500',
  down: 'bg-red-500',
};

const LOG_COLORS: Record<LogEntry['level'], string> = {
  info: 'text-sky-600 dark:text-sky-300',
  warn: 'text-amber-600 dark:text-amber-300',
  error: 'text-red-600 dark:text-red-300',
};

export function MonitoringPanel({
  services,
  logs,
}: MonitoringPanelProps): React.JSX.Element {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card className="border-border/80">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">Service Health</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {services.map((service) => (
            <div
              key={service.name}
              className="flex items-center justify-between rounded-lg border border-border/70 px-3 py-2"
            >
              <div className="flex items-center gap-2">
                <span
                  className={cn('h-2 w-2 rounded-full', STATUS_COLORS[service.status])}
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-medium">{service.name}</p>
                  <p className="text-xs capitalize text-muted-foreground">
                    {service.status}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-mono text-xs">{service.latencyMs}ms</p>
                <p className="text-[10px] text-muted-foreground">{service.uptime}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-border/80">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">Recent Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-h-64 space-y-2 overflow-y-auto font-mono text-xs">
            {logs.map((log) => (
              <div
                key={log.id}
                className="rounded-md border border-border/60 bg-zinc-950 px-3 py-2 text-zinc-100 dark:bg-zinc-900"
              >
                <span className={LOG_COLORS[log.level]}>[{log.level}]</span>{' '}
                <span className="text-zinc-400">{log.service}</span> · {log.time}
                <p className="mt-1 text-zinc-300">{log.message}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
