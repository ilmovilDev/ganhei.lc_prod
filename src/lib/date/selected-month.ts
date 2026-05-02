const STORAGE_KEY = "selected-month";

export function saveSelectedMonth(month: string): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(STORAGE_KEY, month);
}

export function getStoredMonth(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(STORAGE_KEY);
}
