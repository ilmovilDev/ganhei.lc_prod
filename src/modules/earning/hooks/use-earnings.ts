"use client";

import { useQuery } from "@tanstack/react-query";
import { getEarningsAction } from "../actions/get-earnings.action";
import { earningsKeys } from "@/constants/query-keys";
import { EarningsDay } from "../types/earning.types";

const FIVE_MINUTES = 1000 * 60 * 5;

export function useEarnings(month: string, year: string) {
  return useQuery({
    queryKey: earningsKeys.byPeriod(month, year),
    queryFn: () => getEarningsAction(month, year),
    staleTime: FIVE_MINUTES,
    enabled: !!month && !!year,
    select: (result): EarningsDay[] | null => {
      if (!result.success) return null;
      return result.data;
    },
  });
}
