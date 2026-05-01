"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface MetricCardSkeletonProps {
  highlight?: boolean;
  className?: string;
}

export default function MetricCardSkeleton({
  highlight = false,
  className,
}: MetricCardSkeletonProps) {
  return (
    <Card className={cn("h-full", className)}>
      <CardContent className="p-4">
        <div className="flex items-center gap-2.5">
          <Skeleton className="size-8 shrink-0 rounded-lg" />
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-3 w-16" />
            <Skeleton
              className={cn(highlight ? "h-6 w-28 md:h-5 md:w-24" : "h-5 w-24")}
            />
          </div>
        </div>
        <Skeleton className="mt-3 h-3 w-32" />
      </CardContent>
    </Card>
  );
}
