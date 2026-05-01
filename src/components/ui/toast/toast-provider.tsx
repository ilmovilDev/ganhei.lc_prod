"use client";

import { useState, useCallback } from "react";
import { ToastContext } from "./toast-context";
import { ToastOptions } from "./toast.types";
import { ToastRoot } from "./toast-root";
import { nanoid } from "nanoid";

interface ToastInternal extends ToastOptions {
  id: string;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastInternal[]>([]);

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback(
    (options: ToastOptions) => {
      const id = nanoid();

      setToasts((prev) => [...prev, { id, ...options }]);

      const duration = options.duration ?? 4000;

      setTimeout(() => remove(id), duration);
    },
    [remove],
  );

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <ToastRoot toasts={toasts} onRemove={remove} />
    </ToastContext.Provider>
  );
}
