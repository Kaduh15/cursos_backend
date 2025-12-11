import { eq } from 'drizzle-orm'

import { db } from '@/db'
import { courses } from '@/db/schema'
import { NotFoundError } from '@/utils/http-errors'
import type {
  CreateCourseSchema,
  UpdateCourseSchema,
} from '../routes/courses/course.schemas'

export class CourseRepository {
  constructor(private readonly database = db) {}

  async countAll() {
    const total = await this.database.$count(courses)

    return total
  }

  async create(data: CreateCourseSchema) {
    const [course] = await this.database
      .insert(courses)
      .values(data)
      .returning()

    return course
  }

  listAll(filter?: { status: boolean } | undefined) {
    if (filter?.status !== undefined) {
      return this.database
        .select()
        .from(courses)
        .where(eq(courses.status, filter.status))
    }
    return this.database.select().from(courses)
  }

  async getById(id: string) {
    return await this.database
      .select()
      .from(courses)
      .where(eq(courses.id, id))
      .limit(1)
      .then(([course]) => course)
  }

  async update(id: string, data: UpdateCourseSchema) {
    const hasCourse = await this.getById(id)

    if (!hasCourse) {
      throw new NotFoundError('Course not found')
    }

    const [course] = await this.database
      .update(courses)
      .set(data)
      .where(eq(courses.id, id))
      .returning()

    return course
  }

  async delete(id: string) {
    const hasCourse = await this.getById(id)

    if (!hasCourse) {
      throw new NotFoundError('Course not found')
    }

    await this.database.delete(courses).where(eq(courses.id, id))
  }
}
