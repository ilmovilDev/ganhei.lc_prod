import { prisma } from "@/lib/db/prisma";
import { DashboardRaw } from "../types/dashboard.types";
import { GetDashboardInput } from "../schemas/get-dashboard.schema";

export async function getDashboardService({
  userId,
  month,
}: GetDashboardInput): Promise<DashboardRaw> {
  const year = new Date().getFullYear();
  const monthIndex = Number(month);

  // lt (não lte) — endDate é o primeiro dia do mês seguinte
  const startDate = new Date(year, monthIndex - 1, 1);
  const endDate = new Date(year, monthIndex, 1);

  const dateFilter = { gte: startDate, lt: endDate };

  const dayWhere = {
    day: { is: { clerkId: userId, date: dateFilter } },
  };

  const [earningsAgg, expensesAgg, days] = await Promise.all([
    prisma.earning.aggregate({
      where: dayWhere,
      _sum: { amount: true },
    }),

    prisma.expense.aggregate({
      where: dayWhere,
      _sum: { amount: true },
    }),

    prisma.day.findMany({
      where: { clerkId: userId, date: dateFilter },
      select: { hours: true, kilometers: true },
    }),
  ]);

  const totalEarnings = Number(earningsAgg._sum.amount ?? 0);
  const totalExpenses = Number(expensesAgg._sum.amount ?? 0);

  // hours e kilometers são Int no schema — nunca null
  const { totalHours, totalKm } = days.reduce(
    (acc, d) => ({
      totalHours: acc.totalHours + Number(d.hours),
      totalKm: acc.totalKm + Number(d.kilometers),
    }),
    { totalHours: 0, totalKm: 0 },
  );

  return {
    totalEarnings,
    totalExpenses,
    totalNet: totalEarnings - totalExpenses,
    totalHours,
    totalKm,
    daysCount: days.length,
  };
}
