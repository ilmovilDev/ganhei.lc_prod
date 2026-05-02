export function getCurrentMonth(): string {
  return String(new Date().getMonth() + 1).padStart(2, "0");
}

export function getCurrentYear(): string {
  return String(new Date().getFullYear());
}
