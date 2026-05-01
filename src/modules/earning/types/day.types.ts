export interface AppInput {
  name: string;
  amount: number;
}

export interface DayInput {
  date: Date;
  hours: number;
  kilometers: number;
  apps: AppInput[];
}

export interface DayDTO {
  id: string;
  date: Date;
  hours: number;
  kilometers: number;
  earnings: {
    id: string;
    app: string;
    amount: number;
  }[];
}
