import { App } from "@/generated/prisma/enums";

export interface EarningRow {
  app: App;
  amount: number;
}

export interface EarningsDay {
  id: string;
  date: Date;
  hours: number;
  kilometers: number;
  earnings: EarningRow[];
  expenses: number;
  gross: number;
  net: number;
}
