export function formatDate(iso: string, style: 'short' | 'long' = 'short'): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '—';

  if (style === 'long') {
    return date.toLocaleDateString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });
}

export function isOverdue(iso: string): boolean {
  return new Date(iso) < new Date();
}
