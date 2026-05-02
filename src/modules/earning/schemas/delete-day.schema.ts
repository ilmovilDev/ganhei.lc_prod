import { z } from "zod";

export const deleteDaySchema = z.object({
  userId: z.string({ message: "Usuário inválido" }).min(1, "Usuário inválido"),

  dayId: z.string({ message: "Dia inválido" }).cuid("ID inválido"),
});

export type DeleteDayInput = z.infer<typeof deleteDaySchema>;
