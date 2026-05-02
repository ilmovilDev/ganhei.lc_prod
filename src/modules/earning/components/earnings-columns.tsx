"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/helpers/format-currency";
import { APP_LABELS } from "../constants/apps";
import { cn } from "@/lib/utils";
import { EarningsDay } from "../types/earning.types";
import { Badge } from "@/components/ui/badge";
import { parseLocalDate } from "@/lib/date/parse-local-date";

export interface EarningsColumnActions {
  onEdit: (day: EarningsDay) => void;
  onDelete: (day: EarningsDay) => void;
}

export function buildEarningsColumns(
  actions: EarningsColumnActions,
): ColumnDef<EarningsDay>[] {
  return [
    {
      accessorKey: "date",
      header: "Data",
      size: 140,
      cell: ({ row }) => {
        const date = parseLocalDate(row.original.date);
        return (
          <div className="flex flex-col">
            <span className="text-sm font-medium">
              {format(date, "dd/MM/yyyy")}
            </span>
            <span className="text-muted-foreground text-xs capitalize">
              {format(date, "EEEE", { locale: ptBR })}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "earnings",
      header: "Aplicativos",
      size: 160,
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-1">
          {row.original.earnings.map((e) => (
            <Badge key={e.app} variant="secondary" className="text-xs">
              {APP_LABELS[e.app]}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      accessorKey: "hours",
      header: "Horas",
      size: 80,
      cell: ({ row }) => <span className="text-sm">{row.original.hours}h</span>,
    },
    {
      accessorKey: "kilometers",
      header: "Km",
      size: 80,
      cell: ({ row }) => (
        <span className="text-sm">{row.original.kilometers} km</span>
      ),
    },
    {
      accessorKey: "gross",
      header: "Bruto",
      size: 120,
      cell: ({ row }) => (
        <span className="text-sm font-medium text-teal-600">
          {formatCurrency(row.original.gross)}
        </span>
      ),
    },
    {
      accessorKey: "expenses",
      header: "Despesas",
      size: 120,
      cell: ({ row }) => {
        const hasExpenses = row.original.expenses > 0;
        return (
          <span
            className={cn(
              "text-sm font-medium",
              hasExpenses ? "text-red-600" : "text-muted-foreground",
            )}
          >
            {formatCurrency(row.original.expenses)}
          </span>
        );
      },
    },
    {
      accessorKey: "net",
      header: "Líquido",
      size: 120,
      cell: ({ row }) => (
        <span className="text-sm font-semibold text-teal-600">
          {formatCurrency(row.original.net)}
        </span>
      ),
    },
    {
      id: "actions",
      header: () => null,
      size: 160,
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-1.5">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2.5 text-xs"
            onClick={() => actions.onEdit(row.original)}
          >
            <Pencil className="h-3.5 w-3.5" />
            <span className="ml-1.5 hidden sm:inline">Editar</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 px-2.5 text-xs"
            onClick={() => actions.onDelete(row.original)}
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span className="ml-1.5 hidden sm:inline">Excluir</span>
          </Button>
        </div>
      ),
    },
  ];
}
