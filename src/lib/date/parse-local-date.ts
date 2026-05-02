export function parseLocalDate(date: Date | string): Date {
  const d = new Date(date);
  return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
}
