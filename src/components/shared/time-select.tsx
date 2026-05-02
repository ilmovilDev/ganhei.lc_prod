"use client";

import { useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useRouter, usePathname } from "next/navigation";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

// ── constants ────────────────────────────────────────────────────────────────

const MONTH_OPTIONS = [
  { value: "01", label: "Janeiro" },
  { value: "02", label: "Fevereiro" },
  { value: "03", label: "Março" },
  { value: "04", label: "Abril" },
  { value: "05", label: "Maio" },
  { value: "06", label: "Junho" },
  { value: "07", label: "Julho" },
  { value: "08", label: "Agosto" },
  { value: "09", label: "Setembro" },
  { value: "10", label: "Outubro" },
  { value: "11", label: "Novembro" },
  { value: "12", label: "Dezembro" },
] as const;

type MonthValue = (typeof MONTH_OPTIONS)[number]["value"];

const VALID_MONTHS = new Set(MONTH_OPTIONS.map((m) => m.value));

function buildYearOptions(): { value: string; label: string }[] {
  const current = new Date().getFullYear();
  return Array.from({ length: 3 }, (_, i) => {
    const y = String(current - i);
    return { value: y, label: y };
  });
}

const YEAR_OPTIONS = buildYearOptions();
const VALID_YEARS = new Set(YEAR_OPTIONS.map((y) => y.value));

// ── helpers ──────────────────────────────────────────────────────────────────

function getCurrentMonth(): MonthValue {
  return String(new Date().getMonth() + 1).padStart(2, "0") as MonthValue;
}

function getCurrentYear(): string {
  return String(new Date().getFullYear());
}

function normalizeMonth(value: string | undefined): MonthValue {
  if (!value) return getCurrentMonth();
  const normalized = value.padStart(2, "0");
  return VALID_MONTHS.has(normalized as MonthValue)
    ? (normalized as MonthValue)
    : getCurrentMonth();
}

function normalizeYear(value: string | undefined): string {
  if (!value) return getCurrentYear();
  return VALID_YEARS.has(value) ? value : getCurrentYear();
}

// ── component ────────────────────────────────────────────────────────────────

interface TimeSelectProps {
  month?: string;
  year?: string;
}

export default function TimeSelect({ month, year }: TimeSelectProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const currentMonth = normalizeMonth(month);
  const currentYear = normalizeYear(year);

  function navigate(newMonth: string, newYear: string) {
    const params = new URLSearchParams();
    params.set("month", newMonth);
    params.set("year", newYear);

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  }

  const handleMonthChange = (value: string) => {
    if (!VALID_MONTHS.has(value as MonthValue)) return;
    if (value === currentMonth) return;
    navigate(value, currentYear);
  };

  const handleYearChange = (value: string) => {
    if (!VALID_YEARS.has(value)) return;
    if (value === currentYear) return;
    navigate(currentMonth, value);
  };

  const selectedMonthLabel =
    MONTH_OPTIONS.find((m) => m.value === currentMonth)?.label ?? "Selecionar";

  return (
    <div className="flex items-center gap-2">
      <Select
        value={currentYear}
        onValueChange={handleYearChange}
        disabled={isPending}
      >
        <SelectTrigger
          className={cn(
            "h-10 w-24",
            "bg-background border px-2 shadow-sm",
            isPending && "opacity-70",
          )}
        >
          <span className="text-sm font-medium">{currentYear}</span>
        </SelectTrigger>

        <SelectContent position="popper">
          {YEAR_OPTIONS.map((y) => (
            <SelectItem key={y.value} value={y.value}>
              {y.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={currentMonth}
        onValueChange={handleMonthChange}
        disabled={isPending}
      >
        <SelectTrigger
          className={cn(
            "h-10 w-full md:w-fit",
            "bg-background border px-2 shadow-sm",
            isPending && "opacity-70",
          )}
        >
          <div className="flex items-center gap-2">
            <Calendar className="text-muted-foreground h-4 w-4" />
            <span className="text-sm font-medium">{selectedMonthLabel}</span>
          </div>
        </SelectTrigger>

        <SelectContent position="popper">
          {MONTH_OPTIONS.map((m) => (
            <SelectItem key={m.value} value={m.value}>
              {m.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
