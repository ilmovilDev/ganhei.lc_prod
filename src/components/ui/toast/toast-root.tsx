"use client";

import { ToastOptions } from "./toast.types";

interface ToastItem extends ToastOptions {
  id: string;
}

interface Props {
  toasts: ToastItem[];
  onRemove: (id: string) => void;
}

export function ToastRoot({ toasts, onRemove }: Props) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="min-w-70 rounded-lg border bg-white p-4 shadow"
        >
          {t.title && <div className="font-medium">{t.title}</div>}
          {t.description && (
            <div className="text-muted-foreground text-sm">{t.description}</div>
          )}
        </div>
      ))}
    </div>
  );
}
