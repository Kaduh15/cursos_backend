import { randomInt } from 'node:crypto'
import { faker } from '@faker-js/faker/locale/pt_BR'

import { db } from '@/db'
import { courses } from '@/db/schema'

export async function makeCourse(
  override?: Partial<typeof courses.$inferSelect>,
) {
  return db
    .insert(courses)
    .values({
      title: faker.lorem.words(3),
      description: faker.lorem.paragraph(),
      duration: randomInt(1, 100),
      imageUrl: faker.image.url({ height: 480, width: 640 }),
      ...override,
    })
    .returning()
}
