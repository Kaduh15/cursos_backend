import { Router } from 'express'

import authMiddleware from '@/middlewares/auth.middleware'
import bodyValidationMiddleware from '@/middlewares/body-validation.middleware'
import { CourseRepository } from '@/repositories/course.repository'
import { createCourseSchema } from './course.schemas'
import { CourseController } from './couse.controller'
import { CourseService } from './couse.service'

const courseRepository = new CourseRepository()
const courseService = new CourseService(courseRepository)
const courseController = new CourseController(courseService)

const courseRouter = Router()

courseRouter.post(
  '/',
  bodyValidationMiddleware(createCourseSchema),
  courseController.create,
)

courseRouter.get(
  '/',
  authMiddleware({
    strictBlock: false,
  }),
  courseController.listAll,
)

courseRouter.get('/total', courseController.totalCourses)

export { courseRouter }
