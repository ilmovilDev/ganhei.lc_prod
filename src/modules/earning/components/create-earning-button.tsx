"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import UpsertDayDialog from "./upsert-day-dialog";

interface Props {
  userCanRegisterDay: boolean;
}

export default function CreateEarningButton({ userCanRegisterDay }: Props) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  return (
    <>
      <Button
        onClick={() => setDialogIsOpen(true)}
        disabled={!userCanRegisterDay}
        size="icon"
        aria-label={
          userCanRegisterDay
            ? "Registrar ganhos do dia"
            : "Limite do plano atingido"
        }
        className="size-9 h-9 md:w-auto md:gap-2 md:px-3"
      >
        <PlusIcon />

        {/* 👇 Texto solo en md+ */}
        <span className="hidden md:inline">Registrar ganhos do dia</span>
      </Button>

      <UpsertDayDialog isOpen={dialogIsOpen} onOpenChange={setDialogIsOpen} />
    </>
  );
}
