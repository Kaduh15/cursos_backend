import { eq } from 'drizzle-orm'

import { db } from '@/db'
import { users } from '@/db/schema'
import type { RegisterSchema } from '@/routes/auth/auth.schemas'

export const UserRepository = {
  create,
  getByEmail,
}

async function create(data: RegisterSchema) {
  const [user] = await db
    .insert(users)
    .values({
      name: data.name,
      email: data.email,
      password: data.password,
    })
    .returning()

  return user
}

async function getByEmail(email: string) {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1)

  return user
}
