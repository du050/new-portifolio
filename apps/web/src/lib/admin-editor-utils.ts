export function createEntityId(prefix: string): string {
  const suffix = Math.random().toString(36).slice(2, 9);
  return `${prefix}-${suffix}`;
}

export function slugifyValue(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
