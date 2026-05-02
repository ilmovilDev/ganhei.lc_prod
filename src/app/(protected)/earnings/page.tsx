import EarningsContent from "@/modules/earning/components/earnings-content";
import { getCurrentMonth, getCurrentYear } from "@/lib/date/current-period";
import HeaderPage from "@/components/shared/header/header-page";

interface EarningsPageProps {
  searchParams: Promise<{ month?: string; year?: string }>;
}

export default async function EarningsPage({
  searchParams,
}: EarningsPageProps) {
  const { month, year } = await searchParams;

  const currentMonth = month ?? getCurrentMonth();
  const currentYear = year ?? getCurrentYear();

  return (
    <div className="flex h-full flex-col gap-y-4 overflow-hidden p-4">
      <HeaderPage month={currentMonth} year={currentYear} />
      <div className="px-4">
        <EarningsContent month={currentMonth} year={currentYear} />
      </div>
    </div>
  );
}
