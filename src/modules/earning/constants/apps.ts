import { App } from "@/generated/prisma/client";

type AppConfig = {
  value: App;
  label: string;
};

export const Apps = [
  { value: "UBER", label: "Uber" },
  { value: "NINETY_NINE", label: "99" },
  { value: "INDRIVE", label: "inDrive" },
  { value: "IFOOD", label: "iFood" },
  { value: "NINETY_NINE_FOOD", label: "99Food" },
  { value: "SHOPEE", label: "Shopee" },
  { value: "GENERIC_DELIVERY", label: "Entrega" },
  { value: "OTHER", label: "Outro" },
] as const satisfies ReadonlyArray<AppConfig>;

export const APP_LABELS: Record<App, string> = {
  UBER: "Uber",
  NINETY_NINE: "99",
  INDRIVE: "inDrive",
  IFOOD: "iFood",
  NINETY_NINE_FOOD: "99Food",
  SHOPEE: "Shopee",
  GENERIC_DELIVERY: "Entrega",
  OTHER: "Outro",
};

export type AppOption = (typeof Apps)[number];
