import { PrismaClient } from "@prisma/client";

/**
 * Singleton PrismaClient — mencegah koneksi baru tiap hot-reload saat dev.
 * (Pola resmi Prisma untuk Next.js.)
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
