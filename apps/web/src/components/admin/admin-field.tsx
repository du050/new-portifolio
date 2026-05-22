import {
  getAdminTextareaClassName,
  getTextareaRowCount,
  type AdminTextareaSize,
} from '@/lib/admin-textarea-utils';
import { cn } from '@/lib/utils';

interface AdminFieldProps {
  readonly label: string;
  readonly value: string | number;
  readonly onChange: (value: string) => void;
  readonly isReadOnly: boolean;
  readonly type?: 'text' | 'number' | 'email' | 'url';
  readonly multiline?: boolean;
  readonly textareaSize?: AdminTextareaSize;
  readonly variant?: 'standalone' | 'enterprise';
}

export function AdminField({
  label,
  value,
  onChange,
  isReadOnly,
  type = 'text',
  multiline = false,
  textareaSize = 'default',
  variant = 'enterprise',
}: AdminFieldProps): React.JSX.Element {
  const isEnterprise = variant === 'enterprise';
  const className = cn(
    'w-full rounded-lg border px-3 py-2 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-60',
    isEnterprise
      ? 'border-zinc-300 bg-white text-zinc-900 focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100'
      : 'border-zinc-700 bg-zinc-950 text-white focus:border-violet-500',
    multiline && getAdminTextareaClassName(textareaSize),
  );
  const textValue = String(value);

  return (
    <label className="block space-y-1.5">
      <span
        className={cn(
          'text-xs font-medium uppercase tracking-wide',
          isEnterprise ? 'text-zinc-500' : 'text-zinc-400',
        )}
      >
        {label}
      </span>
      {multiline ? (
        <textarea
          rows={getTextareaRowCount(textValue, textareaSize)}
          value={textValue}
          readOnly={isReadOnly}
          disabled={isReadOnly}
          onChange={(event) => onChange(event.target.value)}
          className={className}
        />
      ) : (
        <input
          type={type}
          value={value}
          readOnly={isReadOnly}
          disabled={isReadOnly}
          onChange={(event) => onChange(event.target.value)}
          className={className}
        />
      )}
    </label>
  );
}
