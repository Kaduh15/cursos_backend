import type { CourseRepository } from '@/repositories/course.repository'
import type { CreateCourseSchema, UpdateCourseSchema } from './course.schemas'

export class CourseService {
  constructor(private readonly repository: CourseRepository) {}
  
  async delete(id: string) {
    await this.repository.delete(id)
  }

  async update(id: string, data: UpdateCourseSchema) {
    const updatedCourse = await this.repository.update(id, data)

    return updatedCourse
  }

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
