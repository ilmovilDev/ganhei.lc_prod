import { z } from "zod";

export const getEarningsSchema = z.object({
  userId: z.string().min(1),
  month: z.string().regex(/^(0[1-9]|1[0-2])$/, { message: "Mês inválido" }),
  year: z.coerce.number().int().min(2020).max(3000),
});

export type GetEarningsInput = z.infer<typeof getEarningsSchema>;
