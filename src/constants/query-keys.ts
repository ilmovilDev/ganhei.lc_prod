export const dashboardKeys = {
  all: ["dashboard"] as const,
  byMonth: (month: string) => ["dashboard", month] as const,
};

export const dayKeys = {
  all: ["days"] as const,
  byMonth: (month: string) => ["days", month] as const,
  detail: (id: string) => ["days", "detail", id] as const,
};
