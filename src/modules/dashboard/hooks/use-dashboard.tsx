"use client";

import { useQuery } from "@tanstack/react-query";
import { getDashboardAction } from "../actions/get-dashboard.action";
import { dashboardKeys } from "@/constants/query-keys";
import { DashboardMetrics } from "../types/dashboard.types";

const FIVE_MINUTES = 1000 * 60 * 5;

export function useDashboard(month: string, year: string) {
  return useQuery({
    queryKey: dashboardKeys.byPeriod(month, year),
    queryFn: () => getDashboardAction(month, year),
    staleTime: FIVE_MINUTES,
    enabled: !!month && !!year,
    select: (result): DashboardMetrics | null => {
      if (!result.success) return null;
      return result.data;
    },
  });
}
