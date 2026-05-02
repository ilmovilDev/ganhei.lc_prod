export const dashboardKeys = {
  all: ["dashboard"] as const,
  byMonth: (month: string) => ["dashboard", month] as const,
  byPeriod: (month: string, year: string) =>
    ["dashboard", month, year] as const,
};

export const dayKeys = {
  all: ["days"] as const,
  byMonth: (month: string) => ["days", month] as const,
  detail: (id: string) => ["days", "detail", id] as const,
};

export const earningsKeys = {
  all: ["earnings"] as const,
  byMonth: (month: string) => ["earnings", month] as const,
  byPeriod: (month: string, year: string) => ["earnings", month, year] as const,
};
