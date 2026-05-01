import { DashboardMetrics, DashboardRaw } from "../types/dashboard.types";

export function mapDashboardToMetrics(raw: DashboardRaw): DashboardMetrics {
  return {
    gross: raw.totalEarnings,
    net: raw.totalNet,
    expenses: raw.totalExpenses,
    perHour: raw.totalHours > 0 ? raw.totalNet / raw.totalHours : 0,
    km: raw.totalKm,
    hasData: raw.daysCount > 0,
  };
}
