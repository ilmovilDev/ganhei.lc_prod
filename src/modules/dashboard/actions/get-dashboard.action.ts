"use server";

import { withAuth } from "@/lib/auth/with-auth";
import { getDashboardSchema } from "../schemas/get-dashboard.schema";
import { getDashboardService } from "../services/get-dashboard.service";
import { mapDashboardToMetrics } from "../mappers/dashboard.mapper";
import { AppError } from "@/lib/errors/app-error";
import { ErrorCodes } from "@/lib/errors/error-codes";

export const getDashboardAction = withAuth(
  async (userId, month: string, year: string) => {
    const parsed = getDashboardSchema.safeParse({ userId, month, year });

    if (!parsed.success) {
      throw new AppError({
        message: "Parâmetros inválidos",
        code: ErrorCodes.VALIDATION_ERROR,
        statusCode: 400,
      });
    }

    const raw = await getDashboardService(parsed.data);
    return mapDashboardToMetrics(raw);
  },
);
