import { Button } from '@/components/ui/Button';
import { AdminVariableRow } from '@/components/admin/admin-variable-row';
import { cn } from '@/lib/utils';

interface AdminStringListProps {
  readonly title: string;
  readonly items: readonly string[];
  readonly variableLabel: string;
  readonly valueLabel?: string;
  readonly isReadOnly: boolean;
  readonly canEditVariable: boolean;
  readonly variant?: 'standalone' | 'enterprise';
  readonly onChange: (items: readonly string[]) => void;
}

export function AdminStringList({
  title,
  items,
  variableLabel,
  valueLabel = 'Value',
  isReadOnly,
  canEditVariable,
  variant = 'enterprise',
  onChange,
}: AdminStringListProps): React.JSX.Element {
  const updateItem = (index: number, value: string): void => {
    const next = [...items];
    next[index] = value;
    onChange(next);
  };

  const addItem = (): void => {
    onChange([...items, '']);
  };

  const removeItem = (index: number): void => {
    onChange(items.filter((_, itemIndex) => itemIndex !== index));
  };

  return (
    <div className="space-y-3 border-t border-zinc-200 pt-4 dark:border-zinc-800">
      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">{title}</p>
      {items.map((item, index) => (
        <div key={`${title}-${index}`} className="space-y-2">
          <AdminVariableRow
            variableLabel={`${variableLabel}[${index}]`}
            variableValue={item}
            valueLabel={valueLabel}
            value={item}
            isReadOnly={isReadOnly}
            canEditVariable={canEditVariable}
            variant={variant}
            onVariableChange={(value) => updateItem(index, value)}
            onValueChange={(value) => updateItem(index, value)}
          />
          {!isReadOnly ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-red-600"
              onClick={() => removeItem(index)}
            >
              Remove
            </Button>
          ) : null}
        </div>
      ))}
      {!isReadOnly ? (
        <Button type="button" variant="outline" size="sm" onClick={addItem}>
          Add item
        </Button>
      ) : null}
    </div>
  );
}

interface AdminSectionCardProps {
  readonly children: React.ReactNode;
  readonly variant?: 'standalone' | 'enterprise';
}

export function AdminSectionCard({
  children,
  variant = 'enterprise',
}: AdminSectionCardProps): React.JSX.Element {
  const isEnterprise = variant === 'enterprise';
  return (
    <div
      className={cn(
        'space-y-4 rounded-xl border p-4',
        isEnterprise
          ? 'border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900'
          : 'border-zinc-800',
      )}
    >
      {children}
    </div>
  );
}
