import { ErrorCode } from "@/lib/errors/error-codes";

export type Success<T> = { success: true; data: T };
export type Failure = {
  success: false;
  error: { message: string; code: ErrorCode };
};
export type Result<T> = Success<T> | Failure;
