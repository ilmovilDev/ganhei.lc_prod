"use server";

import { withAuth } from "@/lib/auth/with-auth";
import { deleteDayService } from "../services/delete-day.service";
import { z } from "zod";
import { AppError } from "@/lib/errors/app-error";
import { ErrorCodes } from "@/lib/errors/error-codes";

const deleteDaySchema = z.object({
  dayId: z.string().cuid("ID inválido"),
});

export const deleteDayAction = withAuth(async (userId, dayId: string) => {
  // valida o input antes de chegar no service
  const parsed = deleteDaySchema.safeParse({ dayId });
  if (!parsed.success) {
    throw new AppError({
      message: "ID de registro inválido",
      code: ErrorCodes.VALIDATION_ERROR,
      statusCode: 400,
    });
  }

  await deleteDayService(userId, parsed.data.dayId);
});
