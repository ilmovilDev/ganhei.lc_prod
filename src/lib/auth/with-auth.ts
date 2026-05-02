import { Result } from "@/types/result.type";
import { handleResult } from "../errors/handle-result";
import { AppError } from "../errors/app-error";
import { ErrorCodes } from "../errors/error-codes";
import { auth } from "@clerk/nextjs/server";

/**
 * Wraps a server action with auth + handleResult.
 * Eliminates boilerplate across all actions.
 */
export function withAuth<TArgs extends unknown[], TReturn>(
  fn: (userId: string, ...args: TArgs) => Promise<TReturn>,
) {
  return async (...args: TArgs): Promise<Result<TReturn>> =>
    handleResult(async () => {
      const { userId } = await auth(); // 👈 não usa requireUserOrRedirect

      if (!userId) {
        throw new AppError({
          message: "Não autorizado",
          code: ErrorCodes.UNAUTHORIZED,
          statusCode: 401,
        });
      }
      return fn(userId, ...args);
    });
}
