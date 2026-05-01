export interface DashboardRaw {
  totalEarnings: number;
  totalExpenses: number;
  totalNet: number;
  totalHours: number;
  totalKm: number;
  daysCount: number;
}

export interface DashboardMetrics {
  gross: number;
  net: number;
  expenses: number;
  perHour: number;
  km: number;
  hasData: boolean;
}
