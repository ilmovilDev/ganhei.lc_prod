import { ReceiptText } from "lucide-react";

export default function EarningsEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed py-16 text-center">
      <ReceiptText className="text-muted-foreground h-9 w-9" />
      <div className="space-y-1">
        <p className="text-sm font-medium">Nenhum registro encontrado</p>
        <p className="text-muted-foreground text-xs">
          Não há ganhos registrados para este mês.
        </p>
      </div>
    </div>
  );
}
