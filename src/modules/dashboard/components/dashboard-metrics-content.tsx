"use client";

import { useDashboard } from "@/modules/dashboard/hooks/use-dashboard";

import DashboardEmptyState from "./dashboard-empty-state";
import DashboardErrorState from "./dashboard-error-state";
import MetricsGrid, { MetricsGridSkeleton } from "./metrics-grid";

interface DashboardMetricsContentProps {
  month: string;
}

export default function DashboardMetricsContent({
  month,
}: DashboardMetricsContentProps) {
  const { data, isLoading, isError } = useDashboard(month);

  if (isLoading) return <MetricsGridSkeleton />;

  // erro de rede ou runtime — action retornou { success: false }
  if (isError || data === null) return <DashboardErrorState />;

  // sem registros no mês
  if (!data?.hasData) return <DashboardEmptyState />;

  return <MetricsGrid data={data} />;
}
