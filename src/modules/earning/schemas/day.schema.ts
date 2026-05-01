import { z } from "zod";

const appEntrySchema = z.object({
  name: z.string().min(1, "Selecione um aplicativo"),
  amount: z.number().min(0.01, "Valor deve ser maior que zero"),
});

export const daySchema = z.object({
  date: z.date({ message: "Selecione uma data" }).refine(
    (d) => d <= new Date(), // 👈 avaliado no momento da validação
    { message: "A data não pode ser futura" },
  ),

  hours: z
    .number({ message: "Informe as horas" })
    .min(0.5, "Mínimo 0,5 horas")
    .max(24, "Máximo 24 horas"),

  kilometers: z
    .number({ message: "Informe a quilometragem" })
    .min(1, "Mínimo 1 km"),

  apps: z
    .array(appEntrySchema)
    .min(1, "Adicione ao menos um aplicativo")
    .refine((apps) => new Set(apps.map((a) => a.name)).size === apps.length, {
      message: "Aplicativos duplicados não são permitidos",
    }),
});

export type DayFormData = z.infer<typeof daySchema>;
