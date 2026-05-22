import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import type { DashboardProjectRow } from '@/lib/dashboard-data';
import { cn } from '@/lib/utils';

interface ProjectOperationsTableProps {
  readonly rows: readonly DashboardProjectRow[];
}

const STATUS_STYLES: Record<DashboardProjectRow['status'], string> = {
  active: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
  review: 'bg-amber-500/10 text-amber-700 dark:text-amber-300',
  planned: 'bg-sky-500/10 text-sky-700 dark:text-sky-300',
  completed: 'bg-muted text-muted-foreground',
};

export function ProjectOperationsTable({
  rows,
}: ProjectOperationsTableProps): React.JSX.Element {
  return (
    <Card className="overflow-hidden rounded-md border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <CardHeader className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-sm font-semibold">Project Operations</CardTitle>
          <span className="text-xs text-zinc-500">{rows.length} records</span>
        </div>
      </CardHeader>
      <CardContent className="overflow-x-auto p-0">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead className="bg-zinc-50 dark:bg-zinc-950/60">
            <tr className="border-b border-zinc-200 text-xs text-zinc-500 dark:border-zinc-800">
              <th className="px-4 py-3 font-medium">Initiative</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Stack</th>
              <th className="px-4 py-3 font-medium">Impact</th>
              <th className="px-4 py-3 font-medium">Owner</th>
              <th className="px-4 py-3 font-medium">Risk</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-zinc-100 transition-colors last:border-0 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50"
              >
                <td className="px-4 py-3.5">
                  <p className="font-medium">{row.name}</p>
                  <p className="text-xs text-zinc-500">{row.category}</p>
                </td>
                <td className="px-4 py-3.5">
                  <span
                    className={cn(
                      'inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize',
                      STATUS_STYLES[row.status],
                    )}
                  >
                    {row.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-xs text-zinc-500">{row.stack}</td>
                <td className="px-4 py-3.5 font-mono text-xs">{row.impact}</td>
                <td className="px-4 py-3.5 text-xs">{row.owner}</td>
                <td className="px-4 py-3.5">
                  <span className="rounded-full border border-zinc-200 px-2 py-0.5 text-xs capitalize text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
                    {row.risk}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
