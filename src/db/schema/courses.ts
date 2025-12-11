import { boolean, integer, pgTable, text } from 'drizzle-orm/pg-core'
import { uuidv7 } from 'uuidv7'

export const courses = pgTable('courses', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  title: text('title').notNull(),
  description: text('description').notNull(),
  duration: integer('duration').notNull(),
  imageUrl: text('image_url').notNull(),
  status: boolean('status')
    .notNull()
    .$default(() => true),
  createdAt: text('created_at')
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updated_at')
    .notNull()
    .$defaultFn(() => new Date().toISOString())
    .$onUpdateFn(() => new Date().toISOString()),
})
