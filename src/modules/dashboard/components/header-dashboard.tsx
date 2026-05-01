"use client";

import UserGreeting from "@/components/shared/header/user-greeting";
import TimeSelect from "@/components/shared/time-select";
import CreateEarningButton from "@/modules/earning/components/create-earning-button";

interface HeaderDashboardProps {
  month?: string;
}

export default function HeaderDashboard({ month }: HeaderDashboardProps) {
  return (
    <div className="flex h-14 flex-col gap-2 px-4 py-2 md:flex-row md:items-center md:justify-between">
      <div className="hidden md:block">
        <UserGreeting />
      </div>

      <div className="flex items-center gap-x-2">
        <TimeSelect month={month} />
        <CreateEarningButton userCanRegisterDay />
      </div>
    </div>
  );
}
