import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface AdminSectionActionsProps {
  readonly addLabel: string;
  readonly isReadOnly: boolean;
  readonly onAdd: () => void;
  readonly onRemove?: () => void;
  readonly removeLabel?: string;
}

export function AdminSectionActions({
  addLabel,
  isReadOnly,
  onAdd,
  onRemove,
  removeLabel = 'Remove',
}: AdminSectionActionsProps): React.JSX.Element | null {
  if (isReadOnly) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button type="button" variant="outline" size="sm" onClick={onAdd}>
        <Plus className="h-3.5 w-3.5" />
        {addLabel}
      </Button>
      {onRemove ? (
        <Button type="button" variant="ghost" size="sm" onClick={onRemove}>
          <Trash2 className="h-3.5 w-3.5" />
          {removeLabel}
        </Button>
      ) : null}
    </div>
  );
}
