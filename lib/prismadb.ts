import {PrismaClient} from '@prisma/client'

declare global {
  // Adding prisma to globalThis
  var prisma: PrismaClient | undefined
}

const prismadb = globalThis.prisma || new PrismaClient()

// If we are in dev mode
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prismadb

export default prismadb