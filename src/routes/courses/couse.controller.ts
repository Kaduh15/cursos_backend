import type { NextFunction, Request, Response } from 'express'
import { StatusCodes } from '@/utils/https-status-code'
import type { CourseService } from './couse.service'

export class CourseController {
  constructor(private readonly service: CourseService) {}

  delete = async (req: Request, res: Response) => {
    const { id } = req.params

    await this.service.delete(id)

    res.status(StatusCodes.NO_CONTENT).send()
  }

  update = async (req: Request, res: Response) => {
    const { id } = req.params
    const data = req.body

    const updatedCourse = await this.service.update(id, data)

    res.status(StatusCodes.OK).json({ course: updatedCourse })
  }

  totalCourses = async (_req: Request, res: Response) => {
    const totalCourses = await this.service.totalCourses()

    res.status(StatusCodes.OK).json({ totalCourses })
  }

  create = async (req: Request, res: Response) => {
    const course = await this.service.create(req.body)

    res.status(StatusCodes.CREATED).json({ course })
  }

  listAll = async (req: Request, res: Response) => {
    const hasAuthenticatedUser = Boolean(req.userId)

    const filter = hasAuthenticatedUser ? undefined : { status: true }

    const courses = await this.service.listAll(filter)

    res.status(StatusCodes.OK).json({ courses })
  }
}
