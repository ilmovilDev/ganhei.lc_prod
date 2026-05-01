"use server";

import { requireUserOrRedirect } from "@/lib/auth/require-user-or-redirect";
import { handleResult } from "@/lib/errors/handle-result";
import { upsertDayService } from "../services/upsert-day.service";
import { DayFormData } from "../schemas/day.schema";
import { Result } from "@/types/result.type";

type Params = { data: DayFormData; dayId?: string };

export async function upsertDayAction(params: Params): Promise<Result<string>> {
  return handleResult(async () => {
    const userId = await requireUserOrRedirect();
    return upsertDayService(userId, params.data, params.dayId);
  });
}
