import 'dotenv'
import { z } from 'zod'

export const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.url(),
  JWT_SECRET: z.string().min(1),
})

export const env = envSchema.parse(process.env)
