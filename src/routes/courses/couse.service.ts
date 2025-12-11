import type { CourseRepository } from '@/repositories/course.repository'
import type { CreateCourseSchema } from './course.schemas'

export class CourseService {
  constructor(private readonly repository: CourseRepository) {}
  
  async totalCourses() {
    const total = await this.repository.countAll()

    return total
  }

  async create(data: CreateCourseSchema) {
    const course = await this.repository.create(data)

    return course
  }

  listAll(filter?: { status: boolean }) {
    return this.repository.listAll(filter)
  }
}
