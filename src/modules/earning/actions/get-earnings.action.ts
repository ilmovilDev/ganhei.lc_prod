"use server";

import { withAuth } from "@/lib/auth/with-auth";
import { getEarningsSchema } from "../schemas/get-earnings.schema";
import { getEarningsService } from "../services/get-earnings.service";
import { AppError } from "@/lib/errors/app-error";
import { ErrorCodes } from "@/lib/errors/error-codes";

export const getEarningsAction = withAuth(
  async (userId, month: string, year: string) => {
    const parsed = getEarningsSchema.safeParse({ userId, month, year });

    if (!parsed.success) {
      throw new AppError({
        message: "Parâmetros inválidos",
        code: ErrorCodes.VALIDATION_ERROR,
        statusCode: 400,
      });
    }

    return getEarningsService(parsed.data);
  },
);
