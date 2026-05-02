import DashboardMetricsContent from "@/modules/dashboard/components/dashboard-metrics-content";
import { getCurrentMonth, getCurrentYear } from "@/lib/date/current-period";
import HeaderPage from "@/components/shared/header/header-page";

interface DashboardPageProps {
  searchParams: Promise<{ month?: string; year?: string }>;
}

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const { month, year } = await searchParams;

  const currentMonth = month ?? getCurrentMonth();
  const currentYear = year ?? getCurrentYear();

  return (
    <div className="flex h-full flex-col gap-y-4 overflow-hidden p-4">
      <HeaderPage month={currentMonth} year={currentYear} />
      <DashboardMetricsContent month={currentMonth} year={currentYear} />
    </div>
  );
}
