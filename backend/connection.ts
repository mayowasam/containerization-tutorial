// prisma.js
import { PrismaClient } from './generated/prisma/index.js';

// Avoid multiple Prisma instances in dev (hot reload issue)
const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
