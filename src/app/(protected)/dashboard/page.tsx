import { requireUserOrRedirect } from "@/lib/auth/require-user-or-redirect";
import { normalizeMonth } from "@/lib/helpers/normalize-month";
import DashboardMetricsContent from "@/modules/dashboard/components/dashboard-metrics-content";
import HeaderDashboard from "@/modules/dashboard/components/header-dashboard";

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<{ month?: string }>;
}) {
  await requireUserOrRedirect();
  const params = await searchParams;
  const month = normalizeMonth(params?.month);

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <HeaderDashboard month={month} />
      <DashboardMetricsContent month={month} />
    </div>
  );
}
