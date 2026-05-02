"use client";

import { useDashboard } from "@/modules/dashboard/hooks/use-dashboard";
import MetricsGrid, { MetricsGridSkeleton } from "./metrics-grid";
import { EmptyState } from "@/components/shared/empty-state";
import { ReceiptText } from "lucide-react";
import { ErrorState } from "@/components/shared/error-state";

interface DashboardMetricsContentProps {
  month: string;
  year: string;
}

export default function DashboardMetricsContent({
  month,
  year,
}: DashboardMetricsContentProps) {
  const { data, isLoading, isError, refetch } = useDashboard(month, year);

  if (isLoading) return <MetricsGridSkeleton />;

  if (isError || data === null)
    return (
      <ErrorState
        title="Não foi possível carregar o painel"
        description="Verifique sua conexão ou tente novamente em instantes"
        onRetry={() => refetch()}
      />
    );

  // sem registros no mês
  if (!data?.hasData)
    return (
      <EmptyState
        variant="minimal"
        icon={ReceiptText}
        title="Seu painel ainda está vazio"
        description="Registre seus ganhos e gastos para acompanhar seu desempenho no mês"
      />
    );

  return <MetricsGrid data={data} />;
}
