"use client";

import { useState, useCallback, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  SortingState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/toast/use-toast";
import { buildEarningsColumns } from "./earnings-columns";
import { useDeleteDay } from "../hooks/use-delete-day";
import UpsertDayDialog from "@/modules/earning/components/upsert-day-dialog";
import { format } from "date-fns";
import { EarningsDay } from "../types/earning.types";
import { parseLocalDate } from "@/lib/date/parse-local-date";
import { cn } from "@/lib/utils";

interface EarningsTableProps {
  data: EarningsDay[];
}

export default function EarningsTable({ data }: EarningsTableProps) {
  const toast = useToast();

  // ── edit ───────────────────────────────────────────────────────────────────
  const [editDayId, setEditDayId] = useState<string | undefined>();
  const [editOpen, setEditOpen] = useState(false);

  // ── delete ─────────────────────────────────────────────────────────────────
  const [deleteTarget, setDeleteTarget] = useState<EarningsDay | null>(null);
  const { mutateAsync: deleteDay, isPending: isDeleting } = useDeleteDay();

  // ── handlers — useCallback garante referência estável para useMemo ──────────
  const handleEdit = useCallback((day: EarningsDay) => {
    setEditDayId(day.id);
    setEditOpen(true);
  }, []);

  const handleDeleteRequest = useCallback((day: EarningsDay) => {
    setDeleteTarget(day);
  }, []);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    try {
      const result = await deleteDay(deleteTarget.id);

      if (!result.success) {
        toast.error(result.error.message);
        return;
      }

      toast.success("Registro excluído com sucesso");
      setDeleteTarget(null);
    } catch {
      // erro de rede ou runtime
      toast.error("Falha ao excluir. Tente novamente.");
    }
  };

  // ── columns — deps corretas agora que handlers são estáveis ────────────────
  const columns = useMemo(
    () =>
      buildEarningsColumns({
        onEdit: handleEdit,
        onDelete: handleDeleteRequest,
      }),
    [handleEdit, handleDeleteRequest],
  );

  // ── table ──────────────────────────────────────────────────────────────────
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <>
      {/* ── TABLE ──────────────────────────────────────────────────────────── */}
      <div className="rounded-lg border">
        <Table className="w-full table-fixed">
          <TableHeader className="">
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id} className="hover:bg-transparent">
                {hg.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={cn(
                      "text-xs font-medium md:text-base",
                      header.id === "actions" && "text-right",
                    )}
                    style={{ width: header.getSize() }} // 👈 respeita o size definido
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* ── EDIT DIALOG ────────────────────────────────────────────────────── */}
      <UpsertDayDialog
        isOpen={editOpen}
        onOpenChange={setEditOpen}
        dayId={editDayId}
      />

      {/* ── DELETE CONFIRM ─────────────────────────────────────────────────── */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir registro</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. O registro do dia{" "}
              <strong>
                {deleteTarget
                  ? format(parseLocalDate(deleteTarget.date), "dd/MM/yyyy")
                  : ""}
              </strong>{" "}
              e todos os dados associados serão removidos permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Excluindo..." : "Excluir"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
