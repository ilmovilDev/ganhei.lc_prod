"use client";

import { useQuery } from "@tanstack/react-query";
import { getDashboardAction } from "../actions/get-dashboard.action";
import { dashboardKeys } from "@/constants/query-keys";

const FIVE_MINUTES = 1000 * 60 * 5;

export function useDashboard(month: string) {
  return useQuery({
    queryKey: dashboardKeys.byMonth(month),
    queryFn: () => getDashboardAction(month),
    staleTime: FIVE_MINUTES,
    enabled: !!month,
    select: (result) => {
      // desempacota Result<T> — expõe DashboardMetrics | null
      if (!result.success) return null;
      return result.data;
    },
  });
}
