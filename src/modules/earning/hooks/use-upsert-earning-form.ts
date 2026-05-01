"use client";

import { useEffect, useMemo } from "react";
import {
  useForm,
  useFieldArray,
  useWatch,
  SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { daySchema, DayFormData } from "../schemas/day.schema";
import { useUpsertDay } from "./use-upsert-day";
import { ErrorCode, ErrorCodes } from "@/lib/errors/error-codes";

interface UseUpsertEarningFormProps {
  dayId?: string;
  onSuccess?: () => void;
  onError?: (error: { message: string; code: string }) => void;
  onClose?: () => void;
}

// erros que devem ficar visíveis dentro do dialog
const INLINE_ERROR_CODES = new Set<ErrorCode>([
  ErrorCodes.DAY_ALREADY_EXISTS,
  ErrorCodes.DAY_NOT_FOUND,
  ErrorCodes.VALIDATION_ERROR,
]);

export function useUpsertEarningForm({
  dayId,
  onSuccess,
  onError,
  onClose,
}: UseUpsertEarningFormProps = {}) {
  const { mutateAsync, isPending } = useUpsertDay();

  const form = useForm<DayFormData>({
    resolver: zodResolver(daySchema),
    mode: "all",
    defaultValues: {
      date: new Date(),
      hours: undefined,
      kilometers: undefined,
      apps: [],
    },
  });

  // limpa erro root quando usuário edita qualquer campo após um erro
  useEffect(() => {
    const subscription = form.watch(() => {
      if (form.formState.errors.root) {
        form.clearErrors("root");
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const fieldArray = useFieldArray({ control: form.control, name: "apps" });

  // ── reset ao fechar ────────────────────────────────────────────────────────
  // limpa o form quando o dialog fecha (ex: usuário fecha sem salvar)
  const handleClose = () => {
    form.reset();
    onClose?.();
  };

  // ── reactive state ─────────────────────────────────────────────────────────

  const [watchedApps, watchedDate] = useWatch({
    control: form.control,
    name: ["apps", "date"],
  });

  const apps = useMemo(() => watchedApps ?? [], [watchedApps]);

  const total = useMemo(
    () => apps.reduce((sum, a) => sum + (a.amount || 0), 0),
    [apps],
  );

  const selectedAppNames = useMemo(() => apps.map((a) => a.name), [apps]);

  const isValidDate =
    watchedDate instanceof Date && !isNaN(watchedDate.getTime());

  // ── submit ─────────────────────────────────────────────────────────────────

  const onSubmit: SubmitHandler<DayFormData> = async (data) => {
    // limpa erro root anterior antes de tentar novamente
    form.clearErrors("root");

    try {
      const result = await mutateAsync({ data, dayId });

      if (!result.success) {
        const { message, code } = result.error;

        if (INLINE_ERROR_CODES.has(code)) {
          // erro de negócio → fica no dialog, não fecha, não perde dados
          form.setError("root", { message });
          return;
        }

        // erro de sistema → sobe pro toast, não fecha
        onError?.({ message, code });
        return;
      }

      // ✅ sucesso → fecha e limpa
      form.reset();
      onSuccess?.();
    } catch {
      // erro de rede / runtime — não fecha, não perde dados
      onError?.({
        message: "Falha na conexão. Verifique sua internet e tente novamente.",
        code: ErrorCodes.INTERNAL_ERROR,
      });
    }
  };

  return {
    form,
    fieldArray,
    apps,
    selectedAppNames,
    total,
    isValidDate,
    handleSubmit: form.handleSubmit(onSubmit),
    handleClose, // 👈 exposto para o dialog usar no onOpenChange
    isPending,
  };
}
