"use client";

import { DollarSign, Wallet, Clock, Receipt, Car } from "lucide-react";
import { DashboardMetrics } from "@/modules/dashboard/types/dashboard.types";
import { formatCurrency } from "@/lib/helpers/format-currency";
import MetricCard from "./metric-card";
import MetricCardSkeleton from "./metric-card-skeleton";

const GRID = "grid grid-cols-2 gap-3 md:grid-cols-auto-fit-cards";
const FULL_ROW = "col-span-2 md:col-span-1"; // highlight ocupa linha no mobile
const SINGLE = "col-span-1";

export function MetricsGridSkeleton() {
  return (
    <div className={GRID}>
      <div className={FULL_ROW}>
        <MetricCardSkeleton highlight />
      </div>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className={SINGLE}>
          <MetricCardSkeleton />
        </div>
      ))}
    </div>
  );
}

export default function MetricsGrid({ data }: { data: DashboardMetrics }) {
  return (
    <div className={GRID}>
      <div className={FULL_ROW}>
        <MetricCard
          title="Ganhos líquidos"
          value={formatCurrency(data.net)}
          description="Total após descontar todas as despesas do mês"
          icon={<Wallet />}
          color="green"
          highlight
        />
      </div>

      <div className={SINGLE}>
        <MetricCard
          title="Ganhos brutos"
          value={formatCurrency(data.gross)}
          description="Faturamento total sem deduções"
          icon={<DollarSign />}
          color="green"
        />
      </div>

      <div className={SINGLE}>
        <MetricCard
          title="Despesas"
          value={formatCurrency(data.expenses)}
          description="Soma de todos os custos registrados"
          icon={<Receipt />}
          color="red"
        />
      </div>

      <div className={SINGLE}>
        <MetricCard
          title="Por hora"
          value={formatCurrency(data.perHour)}
          description="Ganho líquido médio por hora trabalhada"
          icon={<Clock />}
          color="purple"
        />
      </div>

      <div className={SINGLE}>
        <MetricCard
          title="Quilometragem"
          value={`${data.km} km`}
          description="Distância total percorrida no mês"
          icon={<Car />}
          color="blue"
        />
      </div>
    </div>
  );
}
