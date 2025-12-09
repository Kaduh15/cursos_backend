import { z } from 'zod'

export const loginSchama = z.object({
  email: z.email(),
  password: z.string().min(6),
})

export type LoginSchema = z.infer<typeof loginSchama>

export const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
})

export type RegisterSchema = z.infer<typeof registerSchema>
