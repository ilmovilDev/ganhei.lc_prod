"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Result } from "@/types/result.type";
import { deleteDayAction } from "../actions/delete-day.action";
import { dashboardKeys, earningsKeys } from "@/constants/query-keys";

export function useDeleteDay() {
  const queryClient = useQueryClient();

  return useMutation<Result<void>, Error, string>({
    mutationFn: deleteDayAction,

    onSuccess: (result) => {
      if (!result.success) return;

      queryClient.invalidateQueries({ queryKey: earningsKeys.all });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.all });
    },
  });
}
