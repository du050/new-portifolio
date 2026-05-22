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
    <Card className="border-border/80">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold">Delivery Board</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {COLUMNS.map((column) => {
            const columnCards = cards.filter((card) => card.column === column.id);
            return (
              <div
                key={column.id}
                className="rounded-xl border border-border bg-muted/30 p-3"
              >
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {column.label}
                  </p>
                  <span className="rounded-full bg-background px-2 py-0.5 font-mono text-[10px]">
                    {columnCards.length}
                  </span>
                </div>
                <div className="space-y-2">
                  {columnCards.map((card) => (
                    <div
                      key={card.id}
                      className="rounded-lg border border-border bg-card p-3 shadow-sm"
                    >
                      <p className="text-sm font-medium leading-snug">{card.title}</p>
                      <p className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">
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
