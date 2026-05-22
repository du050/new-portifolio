import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import type { KanbanCard, KanbanColumnId } from '@/lib/dashboard-data';

interface ProjectKanbanBoardProps {
  readonly cards: readonly KanbanCard[];
}

const COLUMNS: readonly { readonly id: KanbanColumnId; readonly label: string }[] = [
  { id: 'backlog', label: 'Backlog' },
  { id: 'in_progress', label: 'In Progress' },
  { id: 'review', label: 'Review' },
  { id: 'done', label: 'Done' },
] as const;

export function ProjectKanbanBoard({
  cards,
}: ProjectKanbanBoardProps): React.JSX.Element {
  return (
    <Card className="rounded-md border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <CardHeader className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
        <CardTitle className="text-sm font-semibold">Delivery Board</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {COLUMNS.map((column) => {
            const columnCards = cards.filter((card) => card.column === column.id);
            return (
              <div
                key={column.id}
                className="rounded-md border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-950/50"
              >
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    {column.label}
                  </p>
                  <span className="rounded-full bg-white px-2 py-0.5 font-mono text-[10px] dark:bg-zinc-900">
                    {columnCards.length}
                  </span>
                </div>
                <div className="space-y-2">
                  {columnCards.map((card) => (
                    <div
                      key={card.id}
                      className="rounded-md border border-zinc-200 bg-white p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
                    >
                      <p className="text-sm font-medium leading-snug">{card.title}</p>
                      <p className="mt-1 text-[10px] uppercase tracking-wider text-zinc-500">
                        {card.tag}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
