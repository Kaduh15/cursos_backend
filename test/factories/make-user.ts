import { randomUUID } from 'node:crypto'
import { fakerPT_BR } from '@faker-js/faker'
import type { InferSelectModel } from 'drizzle-orm'

import { db } from '@/db'
import { users } from '@/db/schema'
import { crypt } from '@/libs/crypt'

type UserType = InferSelectModel<typeof users>

interface MakeUserReturn {
  user: UserType
  passwordBeforeHash: string
}

export async function makeUser(): Promise<MakeUserReturn> {
  const passwordBeforeHash = randomUUID()

  const [user] = await db
    .insert(users)
    .values({
      name: fakerPT_BR.person.fullName(),
      email: fakerPT_BR.internet.email().toLocaleLowerCase(),
      password: await crypt.hash(passwordBeforeHash),
    })
    .returning()

  return {
    user,
    passwordBeforeHash,
  }
}
