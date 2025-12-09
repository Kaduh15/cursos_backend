import { drizzle } from 'drizzle-orm/node-postgres'
import { env } from '@/env'

export const db = drizzle(env.DATABASE_URL, {
  logger: true,
  casing: 'snake_case',
})
