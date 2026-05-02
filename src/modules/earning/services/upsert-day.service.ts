import { prisma } from "@/lib/db/prisma";
import { Prisma } from "@/generated/prisma/client";
import { App } from "@/generated/prisma/enums";
import { AppError } from "@/lib/errors/app-error";
import { ErrorCodes } from "@/lib/errors/error-codes";
import { normalizeToMidnight } from "@/lib/date/normalize-date";
import { DayFormData } from "../schemas/day.schema";

// ─── private helpers ────────────────────────────────────────────────────────

function buildEarningRows(
  dayId: string,
  apps: DayFormData["apps"],
): Prisma.EarningCreateManyInput[] {
  return apps.map((a) => ({
    dayId,
    app: a.name as App,
    amount: new Prisma.Decimal(a.amount),
  }));
}

function handlePrismaError(error: unknown): never {
  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002"
  ) {
    throw new AppError({
      message: "Já existe um registro para esta data",
      code: ErrorCodes.DAY_ALREADY_EXISTS,
      statusCode: 409,
    });
  }

  if (error instanceof AppError) throw error;

  throw new AppError({
    message: "Erro ao salvar os dados",
    code: ErrorCodes.INTERNAL_ERROR,
    statusCode: 500,
  });
}

// ─── service ────────────────────────────────────────────────────────────────

export async function upsertDayService(
  userId: string,
  data: DayFormData,
  dayId?: string,
): Promise<string> {
  const date = normalizeToMidnight(data.date);

  try {
    return await prisma.$transaction(async (tx) => {
      // ── UPDATE ────────────────────────────────────────────────────────────
      if (dayId) {
        const existing = await tx.day.findFirst({
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

        await tx.day.update({
          where: { id: dayId },
          data: { date, hours: data.hours, kilometers: data.kilometers },
        });

        // safe replace strategy
        await tx.earning.deleteMany({ where: { dayId } });
        await tx.earning.createMany({
          data: buildEarningRows(dayId, data.apps),
        });

        return dayId;
      }

      // ── CREATE ────────────────────────────────────────────────────────────
      const created = await tx.day.create({
        data: {
          clerkId: userId,
          date,
          hours: data.hours,
          kilometers: data.kilometers,
        },
      });

      await tx.earning.createMany({
        data: buildEarningRows(created.id, data.apps),
      });

      return created.id;
    });
  } catch (error) {
    handlePrismaError(error);
  }
}
