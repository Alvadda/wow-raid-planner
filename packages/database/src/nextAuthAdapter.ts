import { PrismaAdapter as adapter } from '@next-auth/prisma-adapter'
import { prisma } from './client'

export const PrismaAdapter = adapter(prisma)
