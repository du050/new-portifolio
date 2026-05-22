import {
  getAdminTextareaClassName,
  getTextareaRowCount,
  type AdminTextareaSize,
} from '@/lib/admin-textarea-utils';
import { cn } from '@/lib/utils';

interface AdminFieldPairProps {
  readonly leftLabel: string;
  readonly leftValue: string | number;
  readonly rightLabel: string;
  readonly rightValue: string | number;
  readonly isReadOnly: boolean;
  readonly variant?: 'standalone' | 'enterprise';
  readonly rightType?: 'text' | 'number';
  readonly rightMultiline?: boolean;
  readonly textareaSize?: AdminTextareaSize;
  readonly onLeftChange: (value: string) => void;
  readonly onRightChange: (value: string) => void;
}

export function AdminFieldPair({
  leftLabel,
  leftValue,
  rightLabel,
  rightValue,
  isReadOnly,
  variant = 'enterprise',
  rightType = 'text',
  rightMultiline = false,
  textareaSize = 'default',
  onLeftChange,
  onRightChange,
}: AdminFieldPairProps): React.JSX.Element {
  const isEnterprise = variant === 'enterprise';
  const inputClassName = cn(
    'w-full rounded-lg border px-3 py-2 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-60',
    isEnterprise
      ? 'border-zinc-300 bg-white text-zinc-900 focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100'
      : 'border-zinc-700 bg-zinc-950 text-white focus:border-violet-500',
  );
  const rightInputClassName = cn(
    inputClassName,
    rightMultiline && getAdminTextareaClassName(textareaSize),
  );
  const labelClassName = cn(
    'text-xs font-medium uppercase tracking-wide',
    isEnterprise ? 'text-zinc-500' : 'text-zinc-400',
  );
  const rightTextValue = String(rightValue);

  return (
    <div className={cn('grid gap-3', rightMultiline ? 'grid-cols-1' : 'md:grid-cols-2')}>
      <label className="block space-y-1.5">
        <span className={labelClassName}>{leftLabel}</span>
        <input
          type="text"
          value={leftValue}
          readOnly={isReadOnly}
          disabled={isReadOnly}
          onChange={(event) => onLeftChange(event.target.value)}
          className={inputClassName}
        />
      </label>
      <label className="block space-y-1.5">
        <span className={labelClassName}>{rightLabel}</span>
        {rightMultiline ? (
          <textarea
            rows={getTextareaRowCount(rightTextValue, textareaSize)}
            value={rightTextValue}
            readOnly={isReadOnly}
            disabled={isReadOnly}
            onChange={(event) => onRightChange(event.target.value)}
            className={rightInputClassName}
          />
        ) : (
          <input
            type={rightType}
            value={rightValue}
            readOnly={isReadOnly}
            disabled={isReadOnly}
            onChange={(event) => onRightChange(event.target.value)}
            className={rightInputClassName}
          />
        )}
      </label>
    </div>
  );
}
