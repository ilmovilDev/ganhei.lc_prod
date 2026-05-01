"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@clerk/nextjs";

const GREETINGS = [
  { until: 12, text: "Bom dia 👋" },
  { until: 18, text: "Boa tarde 👋" },
  { until: 24, text: "Boa noite 👋" },
] as const;

function getGreeting(date = new Date()): string {
  const hour = date.getHours();
  return GREETINGS.find((g) => hour < g.until)!.text;
}

export default function UserGreeting() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex flex-col gap-1">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-3 w-36" />
      </div>
    );
  }

  return (
    <div className="flex flex-col leading-none">
      <h2 className="text-sm font-semibold tracking-tight md:text-base">
        Olá, {user?.firstName ?? "Convidado"}
      </h2>
      <p className="text-muted-foreground text-xs">{getGreeting()}</p>
    </div>
  );
}
