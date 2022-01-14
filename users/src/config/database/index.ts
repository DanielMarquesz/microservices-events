import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function prismaClient() {
  await prisma.$connect()
  console.log('Database is up!')
}

export { 
  prismaClient,
  prisma
} 
