"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import UserGreeting from "./user-greeting";
import { Skeleton } from "@/components/ui/skeleton";

export default function Header() {
  return (
    <header className="bg-background flex h-12 items-center justify-between px-4">
      <div className="flex w-full items-center gap-x-2">
        <SidebarTrigger />
        <div className="md:hidden">
          <UserGreeting />
        </div>
      </div>
      <div className="flex w-full items-center justify-end gap-x-2">
        <UserButton fallback={<Skeleton className="h-8 w-8 rounded-full" />} />
      </div>
    </header>
  );
}
