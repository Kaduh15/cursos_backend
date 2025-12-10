import { randomUUID } from 'node:crypto'
import { faker } from '@faker-js/faker/locale/pt_BR'
import type { InferSelectModel } from 'drizzle-orm'

import { db } from '@/db'
import { users } from '@/db/schema'
import { crypt } from '@/lib/crypt'

type UserType = InferSelectModel<typeof users>

interface MakeUserReturn {
  user: UserType
  passwordBeforeHash: string
}

export async function makeUser(
  override?: Partial<UserType>,
): Promise<MakeUserReturn> {
  const passwordBeforeHash = override?.password ?? randomUUID()

  const [user] = await db
    .insert(users)
    .values({
      name: faker.person.fullName(),
      email: faker.internet.email().toLocaleLowerCase(),
      ...override,
      password: await crypt.hash(passwordBeforeHash),
    })
    .returning()

  return {
    user,
    passwordBeforeHash,
  }
}
