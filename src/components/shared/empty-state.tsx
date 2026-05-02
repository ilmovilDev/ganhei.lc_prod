"use client";

import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

// ---------------------------------------------

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;

  // opcional (UX avanzada)
  action?: ReactNode;

  // layout variants
  variant?: "card" | "minimal";
};

// ---------------------------------------------

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  variant = "card",
}: EmptyStateProps) {
  if (variant === "minimal") {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed py-16 text-center">
        <div className="bg-muted flex size-12 items-center justify-center rounded-lg">
          <Icon className="text-muted-foreground size-6" />
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium">{title}</p>
          <p className="text-muted-foreground max-w-xs text-xs">
            {description}
          </p>
        </div>

        {action && <div className="pt-2">{action}</div>}
      </div>
    );
  }

  return (
    <div className="flex w-full items-center justify-center px-4 py-6">
      <Card className="w-full border-dashed shadow-sm">
        <CardHeader className="flex flex-col items-center pb-2 text-center">
          <div className="bg-muted flex size-14 items-center justify-center rounded-xl md:size-16">
            <Icon className="text-muted-foreground size-6 md:size-8" />
          </div>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-3 text-center">
          <CardTitle className="text-base font-semibold md:text-xl">
            {title}
          </CardTitle>

          <CardDescription className="max-w-xs text-xs leading-relaxed md:text-sm">
            {description}
          </CardDescription>

          {action && <div className="pt-2">{action}</div>}
        </CardContent>
      </Card>
    </div>
  );
}
