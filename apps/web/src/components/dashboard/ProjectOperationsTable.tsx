import { Badge } from '@/components/ui/Badge';
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
    <Card className="border-border/80">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold">Project Operations</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto p-0 pb-2">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs text-muted-foreground">
              <th className="px-4 py-2 font-medium">Initiative</th>
              <th className="px-4 py-2 font-medium">Status</th>
              <th className="px-4 py-2 font-medium">Stack</th>
              <th className="px-4 py-2 font-medium">Impact</th>
              <th className="px-4 py-2 font-medium">Owner</th>
              <th className="px-4 py-2 font-medium">Risk</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-border/60 transition-colors hover:bg-muted/40"
              >
                <td className="px-4 py-3">
                  <p className="font-medium">{row.name}</p>
                  <p className="text-xs text-muted-foreground">{row.category}</p>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      'inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize',
                      STATUS_STYLES[row.status],
                    )}
                  >
                    {row.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{row.stack}</td>
                <td className="px-4 py-3 font-mono text-xs">{row.impact}</td>
                <td className="px-4 py-3 text-xs">{row.owner}</td>
                <td className="px-4 py-3">
                  <Badge variant="outline" className="capitalize">
                    {row.risk}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
