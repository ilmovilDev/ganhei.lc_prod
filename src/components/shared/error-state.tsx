"use client";

import { ReactNode } from "react";
import { LucideIcon, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

// ---------------------------------------------

type ErrorStateProps = {
  title?: string;
  description?: string;

  icon?: LucideIcon;

  // acción primaria (retry)
  onRetry?: () => void;

  // acción secundaria (opcional)
  action?: ReactNode;

  variant?: "minimal" | "centered";
};

// ---------------------------------------------

export function ErrorState({
  title = "Algo deu errado",
  description = "Não foi possível carregar os dados",
  icon: Icon = AlertCircle,
  onRetry,
  action,
  variant = "centered",
}: ErrorStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center ${
        variant === "centered" ? "px-4 py-12" : "py-8"
      }`}
    >
      <Icon className="text-destructive mb-2 h-8 w-8" />

      <p className="text-sm font-medium">{title}</p>

      <p className="text-muted-foreground mt-1 max-w-xs text-xs leading-relaxed">
        {description}
      </p>

      {(onRetry || action) && (
        <div className="mt-4 flex gap-2">
          {onRetry && (
            <Button size="sm" onClick={onRetry}>
              Tentar novamente
            </Button>
          )}

          {action}
        </div>
      )}
    </div>
  );
}
