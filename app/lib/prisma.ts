// TODO: Install @prisma/client first by running: npm install @prisma/client
// Then generate Prisma client by running: npx prisma generate

// import { PrismaClient } from '@prisma/client';

// const globalForPrisma = globalThis as unknown as {
//     prisma: PrismaClient | undefined;
// };

// export const prisma =
//     globalForPrisma.prisma ??
//     new PrismaClient({
//         log: ['query'],
//     });

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Temporary mock until Prisma is configured
export const prisma = null as any;
