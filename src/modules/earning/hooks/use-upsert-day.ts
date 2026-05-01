"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { upsertDayAction } from "../actions/upsert-day.action";
import { Result } from "@/types/result.type";
import { dashboardKeys, dayKeys } from "@/constants/query-keys";

type MutationParams = Parameters<typeof upsertDayAction>[0];

export function useUpsertDay() {
  const queryClient = useQueryClient();

  return useMutation<Result<string>, Error, MutationParams>({
    mutationFn: upsertDayAction,

    onSuccess: (result) => {
      if (!result.success) return; // error handled downstream in the form

      queryClient.invalidateQueries({ queryKey: dayKeys.all });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.all });
    },
  });
}
