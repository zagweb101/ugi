/* eslint-disable @typescript-eslint/no-explicit-any */

const globalForPrisma = globalThis as unknown as {
  prisma: any;
};

function createPrismaClient() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { PrismaClient } = require("@prisma/client");
    return new PrismaClient({
      datasourceUrl: process.env.DATABASE_URL,
    });
  } catch {
    return new Proxy({} as any, {
      get() {
        throw new Error("Prisma is not configured. Set DATABASE_URL environment variable.");
      },
    });
  }
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
