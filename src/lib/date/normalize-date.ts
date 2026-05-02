/** Returns a new Date with time zeroed to midnight (UTC-safe for storage). */
export function normalizeToMidnight(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}
