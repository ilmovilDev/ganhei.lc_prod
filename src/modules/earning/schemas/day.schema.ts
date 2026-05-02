import { z } from "zod";

const appEntrySchema = z.object({
  name: z.string().min(1, "Selecione o app"),
  amount: z.number().min(0.01, "Valor inválido").max(9999, "Valor muito alto"),
});

export const daySchema = z.object({
  date: z.date({ message: "Selecione a data" }).refine((d) => d <= new Date(), {
    message: "Data futura inválida",
  }),

  hours: z
    .number({ message: "Informe as horas" })
    .min(0.5, "Mín. 0,5h")
    .max(24, "Máx. 24h"),

  kilometers: z
    .number({ message: "Informe os km" })
    .min(1, "Mín. 1 km")
    .max(999, "Máx. 999 km"),

  apps: z
    .array(appEntrySchema)
    .min(1, "Adicione um app")
    .refine((apps) => new Set(apps.map((a) => a.name)).size === apps.length, {
      message: "Apps duplicados",
    }),
});

export type DayFormData = z.infer<typeof daySchema>;
