import { cn } from '@/lib/utils';

interface AdminVariableRowProps {
  readonly variableLabel: string;
  readonly variableValue: string;
  readonly valueLabel: string;
  readonly value: string | number;
  readonly isReadOnly: boolean;
  readonly canEditVariable: boolean;
  readonly variant?: 'standalone' | 'enterprise';
  readonly valueType?: 'text' | 'number';
  readonly multiline?: boolean;
  readonly onVariableChange: (value: string) => void;
  readonly onValueChange: (value: string) => void;
}

export function AdminVariableRow({
  variableLabel,
  variableValue,
  valueLabel,
  value,
  isReadOnly,
  canEditVariable,
  variant = 'enterprise',
  valueType = 'text',
  multiline = false,
  onVariableChange,
  onValueChange,
}: AdminVariableRowProps): React.JSX.Element {
  const isEnterprise = variant === 'enterprise';
  const inputClassName = cn(
    'w-full rounded-lg border px-3 py-2 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-60',
    isEnterprise
      ? 'border-zinc-300 bg-white text-zinc-900 focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100'
      : 'border-zinc-700 bg-zinc-950 text-white focus:border-violet-500',
  );
  const labelClassName = cn(
    'text-xs font-medium uppercase tracking-wide',
    isEnterprise ? 'text-zinc-500' : 'text-zinc-400',
  );

  return (
    <div className={cn('grid gap-3', multiline ? 'grid-cols-1' : 'md:grid-cols-2')}>
      <label className="block space-y-1.5">
        <span className={labelClassName}>{variableLabel}</span>
        <input
          type="text"
          value={variableValue}
          readOnly={isReadOnly || !canEditVariable}
          disabled={isReadOnly || !canEditVariable}
          onChange={(event) => onVariableChange(event.target.value)}
          className={cn(inputClassName, !canEditVariable && 'font-mono text-xs opacity-80')}
        />
      </label>
      <label className="block space-y-1.5">
        <span className={labelClassName}>{valueLabel}</span>
        {multiline ? (
          <textarea
            rows={3}
            value={String(value)}
            readOnly={isReadOnly}
            disabled={isReadOnly}
            onChange={(event) => onValueChange(event.target.value)}
            className={inputClassName}
          />
        ) : (
          <input
            type={valueType}
            value={value}
            readOnly={isReadOnly}
            disabled={isReadOnly}
            onChange={(event) => onValueChange(event.target.value)}
            className={inputClassName}
          />
        )}
      </label>
    </div>
  );
}
