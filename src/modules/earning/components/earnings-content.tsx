"use client";

import { useEarnings } from "../hooks/use-earnings";
import EarningsTable from "./earnings-table";
import EarningsTableSkeleton from "./earnings-table-skeleton";
import { EmptyState } from "@/components/shared/empty-state";
import { ReceiptText } from "lucide-react";
import { ErrorState } from "@/components/shared/error-state";

interface EarningsContentProps {
  month: string;
  year: string;
}

export default function EarningsContent({ month, year }: EarningsContentProps) {
  const { data, isLoading, isError, refetch } = useEarnings(month, year);

  if (isLoading || data === undefined) return <EarningsTableSkeleton />;
  if (isError || data === null)
    return (
      <ErrorState
        variant="minimal"
        title="Erro ao carregar ganhos"
        description="Não conseguimos buscar seus registros"
        onRetry={() => refetch()}
      />
    );
  if (data.length === 0)
    return (
      <EmptyState
        variant="minimal"
        icon={ReceiptText}
        title="Você ainda não registrou ganhos"
        description="Registre agora e veja quanto está realmente lucrando"
      />
    );

  return <EarningsTable data={data} />;
}
