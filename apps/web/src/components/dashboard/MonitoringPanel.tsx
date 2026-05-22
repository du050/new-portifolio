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
      <Card className="rounded-md border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <CardHeader className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <CardTitle className="text-sm font-semibold">Service Health</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 text-xs text-zinc-500 dark:bg-zinc-950/60">
              <tr>
                <th className="px-4 py-2 font-medium">Service</th>
                <th className="px-4 py-2 font-medium">Status</th>
                <th className="px-4 py-2 font-medium">Latency</th>
                <th className="px-4 py-2 font-medium">Uptime</th>
              </tr>
            </thead>
            <tbody>
          {services.map((service) => (
            <tr
              key={service.name}
              className="border-t border-zinc-100 dark:border-zinc-800"
            >
              <td className="px-4 py-3 font-medium">{service.name}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                <span
                  className={cn('h-2 w-2 rounded-full', STATUS_COLORS[service.status])}
                  aria-hidden="true"
                />
                  <span className="text-xs capitalize text-zinc-500">{service.status}</span>
                </div>
              </td>
              <td className="px-4 py-3 font-mono text-xs">{service.latencyMs}ms</td>
              <td className="px-4 py-3 font-mono text-xs">{service.uptime}</td>
            </tr>
          ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Card className="rounded-md border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <CardHeader className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <CardTitle className="text-sm font-semibold">Recent Logs</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="max-h-64 overflow-y-auto font-mono text-xs">
            {logs.map((log) => (
              <div
                key={log.id}
                className="border-b border-zinc-100 px-4 py-3 last:border-0 dark:border-zinc-800"
              >
                <span className={LOG_COLORS[log.level]}>[{log.level}]</span>{' '}
                <span className="text-zinc-500">{log.service}</span> · {log.time}
                <p className="mt-1 text-zinc-700 dark:text-zinc-300">{log.message}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
