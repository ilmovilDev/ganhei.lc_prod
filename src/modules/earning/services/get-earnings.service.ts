import { prisma } from "@/lib/db/prisma";
import { GetEarningsInput } from "../schemas/get-earnings.schema";
import { EarningsDay } from "../types/earning.types";

export async function getEarningsService({
  userId,
  month,
  year,
}: GetEarningsInput): Promise<EarningsDay[]> {
  const monthIndex = Number(month);

  const startDate = new Date(year, monthIndex - 1, 1);
  const endDate = new Date(year, monthIndex, 1);

  const days = await prisma.day.findMany({
    where: {
      clerkId: userId,
      date: { gte: startDate, lt: endDate },
    },
    include: {
      earnings: {
        select: { app: true, amount: true },
        orderBy: { app: "asc" },
      },
      expenses: { select: { amount: true } },
    },
    orderBy: { date: "asc" },
  });

  return days.map((day) => {
    const gross = day.earnings.reduce((s, e) => s + Number(e.amount), 0);
    const expenses = day.expenses.reduce((s, e) => s + Number(e.amount), 0);

    return {
      id: day.id,
      date: day.date,
      hours: Number(day.hours),
      kilometers: Number(day.kilometers),
      earnings: day.earnings.map((e) => ({
        app: e.app,
        amount: Number(e.amount),
      })),
      expenses,
      gross,
      net: gross - expenses,
    };
  });
}
