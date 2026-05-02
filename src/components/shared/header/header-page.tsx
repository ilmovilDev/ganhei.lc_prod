"use client";

import UserGreeting from "@/components/shared/header/user-greeting";
import TimeSelect from "@/components/shared/time-select";
import CreateEarningButton from "@/modules/earning/components/create-earning-button";

interface PageHeaderProps {
  month?: string;
  year?: string;
}

export default function PageHeader({ month, year }: PageHeaderProps) {
  return (
    <div className="flex h-12 items-center justify-end gap-2 md:flex-row md:justify-between">
      <div className="hidden md:block">
        <UserGreeting />
      </div>

      <div className="flex items-center gap-x-2">
        <TimeSelect month={month} year={year} />
        <CreateEarningButton userCanRegisterDay />
      </div>
    </div>
  );
}
