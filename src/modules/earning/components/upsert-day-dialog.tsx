"use client";

import { CurrencyInput } from "@/components/shared/currency-input";
import { FormAlert } from "@/components/shared/form-alert";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/toast/use-toast";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Apps } from "../constants/apps";
import { useUpsertEarningForm } from "../hooks/use-upsert-earning-form";

interface UpsertDayDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  dayId?: string;
}

const COPY = {
  create: {
    title: "Registrar dia",
    description: "Adicione os dados para acompanhar seu desempenho.",
    submit: "Salvar",
    toast: "Ganhos registrados com sucesso",
  },
  update: {
    title: "Editar dia",
    description: "Atualize os dados deste dia.",
    submit: "Atualizar",
    toast: "Ganhos atualizados com sucesso",
  },
} as const;

export default function UpsertDayDialog({
  isOpen,
  onOpenChange,
  dayId,
}: UpsertDayDialogProps) {
  const toast = useToast();
  const mode = dayId ? "update" : "create";
  const copy = COPY[mode];

  const {
    form,
    fieldArray,
    apps,
    selectedAppNames,
    total,
    isValidDate,
    handleSubmit,
    handleClose, // 👈
    isPending,
  } = useUpsertEarningForm({
    dayId,

    onSuccess: () => {
      toast.success(copy.toast);
      onOpenChange(false);
    },

    // erros de sistema → toast
    onError: ({ message }) => {
      toast.error(message);
    },

    // limpa o form quando dialog fecha sem salvar
    onClose: () => onOpenChange(false),
  });

  const { fields, append, remove } = fieldArray;
  const date = form.watch("date");

  // intercepta o onOpenChange do Dialog para sempre passar pelo handleClose
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleClose();
      return;
    }
    onOpenChange(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className={cn("overflow-hidden p-0 md:w-full md:max-w-sm")}
      >
        {/* ── HEADER ────────────────────────────────────────────────────── */}
        <DialogHeader className="border-b px-4 py-3 md:px-5 md:py-4">
          <DialogTitle className="text-lg font-semibold">
            {copy.title}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm">
            {copy.description}
          </DialogDescription>
        </DialogHeader>

        {/* ── BODY ──────────────────────────────────────────────────────── */}
        <div className="space-y-4 overflow-y-auto px-4 py-3 md:space-y-6 md:px-6 md:py-4">
          {/* 💰 Total card */}
          <div className="bg-muted/40 rounded-xl border px-4 py-3 md:px-5 md:py-4">
            <span className="text-muted-foreground block text-xs">
              Total do dia
            </span>
            <span className="text-3xl font-semibold tracking-tight text-green-600">
              R$ {total.toFixed(2)}
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            {/* 📅 Data */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Data</label>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    type="button"
                    className="h-11 w-full justify-between"
                  >
                    {isValidDate
                      ? format(date, "PPP", { locale: ptBR })
                      : "Selecionar data"}
                    <CalendarIcon className="h-4 w-4 opacity-60" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    locale={ptBR}
                    selected={date}
                    onSelect={(value) =>
                      value &&
                      form.setValue("date", value, { shouldValidate: true })
                    }
                    disabled={(d) => d > new Date()}
                  />
                </PopoverContent>
              </Popover>

              {form.formState.errors.date && (
                <p className="text-destructive text-xs">
                  {form.formState.errors.date.message}
                </p>
              )}
            </div>

            {/* ⏱ Horas / Quilometragem */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Horas trabalhadas</label>
                <Input
                  className="h-11"
                  type="number"
                  step="0.5"
                  placeholder="Ex: 8"
                  {...form.register("hours", { valueAsNumber: true })}
                />
                {form.formState.errors.hours && (
                  <p className="text-destructive text-xs">
                    {form.formState.errors.hours.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Quilometragem</label>
                <Input
                  className="h-11"
                  type="number"
                  placeholder="Ex: 120"
                  {...form.register("kilometers", { valueAsNumber: true })}
                />
                {form.formState.errors.kilometers && (
                  <p className="text-destructive text-xs">
                    {form.formState.errors.kilometers.message}
                  </p>
                )}
              </div>
            </div>

            {/* 📱 Aplicativos */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">Aplicativos</label>
                  {form.formState.errors.apps?.root && (
                    <p className="text-destructive mt-0.5 text-xs">
                      {form.formState.errors.apps.root.message}
                    </p>
                  )}
                </div>

                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => append({ name: "", amount: 0 })}
                >
                  + Adicionar
                </Button>
              </div>

              {fields.length === 0 ? (
                <div className="text-muted-foreground rounded-lg border border-dashed p-4 text-center text-sm">
                  Nenhum aplicativo adicionado.
                </div>
              ) : (
                <div className="space-y-0">
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex items-start gap-2">
                      <div className="space-y-1">
                        <Select
                          value={apps[index]?.name || ""}
                          onValueChange={(value) =>
                            form.setValue(`apps.${index}.name`, value, {
                              shouldValidate: true,
                            })
                          }
                        >
                          <SelectTrigger className="h-11 w-36">
                            <SelectValue placeholder="App" />
                          </SelectTrigger>

                          <SelectContent>
                            {Apps.map((app) => {
                              const isAlreadySelected =
                                selectedAppNames.includes(app.value);
                              const isCurrentRow =
                                apps[index]?.name === app.value;

                              return (
                                <SelectItem
                                  key={app.value}
                                  value={app.value}
                                  disabled={isAlreadySelected && !isCurrentRow}
                                >
                                  {app.label}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>

                        {form.formState.errors.apps?.[index]?.name && (
                          <p className="text-destructive text-xs">
                            {form.formState.errors.apps[index].name?.message}
                          </p>
                        )}
                      </div>

                      <div className="flex-1 space-y-1">
                        <CurrencyInput
                          value={apps[index]?.amount || 0}
                          onChange={(val) =>
                            form.setValue(`apps.${index}.amount`, val, {
                              shouldValidate: true,
                            })
                          }
                        />
                        {form.formState.errors.apps?.[index]?.amount && (
                          <p className="text-destructive text-xs">
                            {form.formState.errors.apps[index].amount?.message}
                          </p>
                        )}
                      </div>

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label="Remover aplicativo"
                        className="mt-0.5 flex h-8 w-8 shrink-0"
                        onClick={() => remove(index)}
                      >
                        ✕
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ⚠️ Root error */}
            <FormAlert message={form.formState.errors.root?.message} />

            {/* ── SUBMIT ──────────────────────────────────────────────── */}
            <Button
              type="submit"
              size="lg"
              disabled={!form.formState.isValid || isPending}
              className="h-12 w-full text-base font-medium"
            >
              {isPending
                ? "Salvando..."
                : `${copy.submit} • R$ ${total.toFixed(2)}`}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
