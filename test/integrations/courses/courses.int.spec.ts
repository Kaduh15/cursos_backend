import { faker } from '@faker-js/faker/locale/pt_BR'
import request from 'supertest'
import { app } from '@/app'
import type { CreateCourseSchema } from '@/routes/courses/course.schemas'
import { makeCourse } from '../../factories/make-course'

describe('Courses Integration Tests', () => {
  it('should create a course successfully', async () => {
    const courseData = {
      title: faker.lorem.words(3),
      description: faker.lorem.paragraph(),
      duration: faker.number.int({ min: 1, max: 100 }),
      imageUrl: faker.image.url({ height: 480, width: 640 }),
    } satisfies CreateCourseSchema

    const response = await request(app).post('/courses').send(courseData)

    expect(response.status).toBe(201)
  })

  // deve listar todos os cursos com status ativos quando não logado
  it('should list all courses with active status when not logged in', async () => {
    await makeCourse({ status: true })
    await makeCourse({ status: false })

    const response = await request(app)
      .get('/courses')
      .set('cookie', 'token=invalidtoken')

    expect(response.status).toBe(200)
    expect(
      response.body.courses.every(
        (course: { status: boolean }) => course.status === true,
      ),
    ).toBe(true)
  })
})
