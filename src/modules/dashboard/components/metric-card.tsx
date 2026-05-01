"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

type MetricCardColor = "green" | "blue" | "purple" | "red" | "gray";

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  icon: ReactNode;
  color?: MetricCardColor;
  highlight?: boolean; // só afeta mobile
  className?: string;
}

const colorVariants: Record<MetricCardColor, { bg: string; text: string }> = {
  green: { bg: "bg-emerald-500/10", text: "text-emerald-700" },
  red: { bg: "bg-red-500/10", text: "text-red-700" },
  blue: { bg: "bg-blue-500/10", text: "text-blue-700" },
  purple: { bg: "bg-violet-500/10", text: "text-violet-700" },
  gray: { bg: "bg-muted", text: "text-foreground" },
};

export default function MetricCard({
  title,
  value,
  description,
  icon,
  color = "gray",
  highlight = false,
  className,
}: MetricCardProps) {
  const c = colorVariants[color];

  return (
    <Card className={cn("h-full transition-shadow hover:shadow-sm", className)}>
      <CardContent className="p-4">
        {/* icon + texts — overflow cortado aqui */}
        <div className="flex min-w-0 items-center gap-2.5">
          <div
            className={cn(
              "flex size-8 shrink-0 items-center justify-center rounded-lg",
              c.bg,
            )}
          >
            <div className={cn("*:size-4", c.text)}>{icon}</div>
          </div>

          {/* min-w-0 é obrigatório para truncate funcionar em flex */}
          <div className="flex min-w-0 flex-col gap-0.5">
            <span className="text-muted-foreground truncate text-xs font-medium">
              {title}
            </span>

            {/*
              Mobile com highlight → text-xl
              Mobile sem highlight → text-base
              md: em diante → sempre text-base, independente de highlight
            */}
            <span
              className={cn(
                "truncate leading-tight font-semibold",
                c.text,
                highlight ? "text-xl md:text-base" : "text-base",
              )}
            >
              {value}
            </span>
          </div>
        </div>

        <p className="text-muted-foreground mt-2.5 truncate text-[0.7rem] leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
