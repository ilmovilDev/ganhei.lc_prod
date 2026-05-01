import { Result } from "@/types/result.type";
import { AppError } from "./app-error";
import { ErrorCode, ErrorCodes } from "./error-codes";

/**
 * Wraps any async fn into a typed Result<T>.
 * Never throws — always returns Success | Failure.
 */
export async function handleResult<T>(
  fn: () => Promise<T>,
): Promise<Result<T>> {
  try {
    const data = await fn();
    return { success: true, data };
  } catch (error) {
    if (error instanceof AppError) {
      return {
        success: false,
        error: { message: error.message, code: error.code as ErrorCode },
      };
    }

    return {
      success: false,
      error: { message: "Erro interno", code: ErrorCodes.INTERNAL_ERROR },
    };
  }
}
