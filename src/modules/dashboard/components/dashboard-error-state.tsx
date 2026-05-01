"use client";

import { AlertCircle } from "lucide-react";

export default function DashboardErrorState() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-4 py-12 text-center">
      <AlertCircle className="text-destructive h-8 w-8" />
      <p className="text-sm font-medium">Erro ao carregar os dados</p>
      <p className="text-muted-foreground text-xs">
        Tente recarregar a página. Se o problema persistir, entre em contato com
        o suporte.
      </p>
    </div>
  );
}
