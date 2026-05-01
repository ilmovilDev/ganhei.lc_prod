"use client";

import { useToastContext } from "./toast-context";

export function useToast() {
  const { show } = useToastContext();

  return {
    success: (description: string) => show({ variant: "success", description }),

    error: (description: string) => show({ variant: "error", description }),

    info: (description: string) => show({ variant: "info", description }),

    warning: (description: string) => show({ variant: "warning", description }),
  };
}
