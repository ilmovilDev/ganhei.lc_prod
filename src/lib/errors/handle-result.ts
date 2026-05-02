import { Result } from "@/types/result.type";
import { AppError } from "./app-error";
import { ErrorCodes } from "./error-codes";

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
        error: { message: error.message, code: error.code },
      };
    }

    return {
      success: false,
      error: {
        message: "Erro interno do servidor",
        code: ErrorCodes.INTERNAL_ERROR,
      },
    };
  }
}
