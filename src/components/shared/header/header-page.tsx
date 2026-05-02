"use client";

import UserGreeting from "@/components/shared/header/user-greeting";
import TimeSelect from "@/components/shared/time-select";
import CreateEarningButton from "@/modules/earning/components/create-earning-button";
import { Suspense } from "react";

interface PageHeaderProps {
  month?: string;
  year?: string;
}

export default function PageHeader({ month, year }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-2 px-4 py-2 md:flex-row md:items-center md:justify-between">
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
