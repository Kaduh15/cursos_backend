import { eq } from 'drizzle-orm'

import { db } from '@/db'
import { users } from '@/db/schema'
import type { RegisterSchema } from '@/routes/auth/auth.schemas'

export class UserRepository {
  constructor(private readonly database = db) {}

  async create(data: RegisterSchema) {
    const [user] = await this.database.insert(users).values(data).returning()

    return user
  }

  async getByEmail(email: string) {
    const [user] = await this.database
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)

    return user
  }

  async getById(id: string) {
    return await this.database
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1)
      .then(([user]) => user)
  }

  async update(id: string, data: Partial<RegisterSchema>) {
    const [user] = await this.database
      .update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning()

    return user
  }

  async delete(id: string) {
    await this.database.delete(users).where(eq(users.id, id))
  }
}
