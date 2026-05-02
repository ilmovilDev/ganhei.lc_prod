import { prisma } from "@/lib/db/prisma";
import { AppError } from "@/lib/errors/app-error";
import { ErrorCodes } from "@/lib/errors/error-codes";

export async function deleteDayService(
  userId: string,
  dayId: string,
): Promise<void> {
  const existing = await prisma.day.findFirst({
    where: { id: dayId, clerkId: userId },
    select: { id: true },
  });

  if (!existing) {
    throw new AppError({
      message: "Registro não encontrado",
      code: ErrorCodes.DAY_NOT_FOUND,
      statusCode: 404,
    });
  }

  // onDelete: Cascade remove earnings e expenses automaticamente
  await prisma.day.delete({ where: { id: dayId } });
}
