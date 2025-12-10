import type { CourseRepository } from '@/repositories/course.repository'
import type { CreateCourseSchema } from './course.schemas'

export class CourseService {
  constructor(private readonly repository: CourseRepository) {}

  async create(data: CreateCourseSchema) {
    const course = await this.repository.create(data)

    return course
  }

  listAll(filter?: { status: boolean }) {
    return this.repository.listAll(filter)
  }
}
