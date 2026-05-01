"use server";

import { requireUserOrRedirect } from "@/lib/auth/require-user-or-redirect";
import { handleResult } from "@/lib/errors/handle-result";
import { getDashboardSchema } from "../schemas/get-dashboard.schema";
import { getDashboardService } from "../services/get-dashboard.service";
import { mapDashboardToMetrics } from "../mappers/dashboard.mapper";
import { AppError } from "@/lib/errors/app-error";
import { ErrorCodes } from "@/lib/errors/error-codes";
import { Result } from "@/types/result.type";
import { DashboardMetrics } from "../types/dashboard.types";

export async function getDashboardAction(
  month: string,
): Promise<Result<DashboardMetrics>> {
  return handleResult(async () => {
    const userId = await requireUserOrRedirect();

    const parsed = getDashboardSchema.safeParse({ userId, month });

    if (!parsed.success) {
      throw new AppError({
        message: "Parâmetros inválidos",
        code: ErrorCodes.VALIDATION_ERROR,
        statusCode: 400,
      });
    }

    const raw = await getDashboardService(parsed.data);
    const metrics = mapDashboardToMetrics(raw);

    return metrics;
  });
}
