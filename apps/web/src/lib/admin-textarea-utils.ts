export type AdminTextareaSize = 'default' | 'long';

const MIN_ROWS_BY_SIZE: Record<AdminTextareaSize, number> = {
  default: 4,
  long: 8,
};

const MAX_ROWS_BY_SIZE: Record<AdminTextareaSize, number> = {
  default: 16,
  long: 32,
};

const MIN_HEIGHT_BY_SIZE: Record<AdminTextareaSize, string> = {
  default: 'min-h-[7rem]',
  long: 'min-h-[12rem]',
};

export function getTextareaRowCount(value: string, size: AdminTextareaSize): number {
  const lineCount = value.split('\n').length;
  const minRows = MIN_ROWS_BY_SIZE[size];
  const maxRows = MAX_ROWS_BY_SIZE[size];
  return Math.min(maxRows, Math.max(minRows, lineCount + 1));
}

export function getAdminTextareaClassName(size: AdminTextareaSize): string {
  return `${MIN_HEIGHT_BY_SIZE[size]} resize-y overflow-auto`;
}
