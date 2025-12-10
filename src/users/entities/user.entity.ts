import { User as PrismaUser } from 'generated/prisma/client'

export class User implements PrismaUser {
  id: string
  email: string
  name: string
  password: string
  createdAt: Date
  updatedAt: Date | null
}
