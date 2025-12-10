import type { Request, Response } from 'express'
import type { CourseService } from './couse.service'

export class CourseController {
  constructor(private readonly service: CourseService) {}

  create = async (req: Request, res: Response) => {
    const course = await this.service.create(req.body)

    res.status(201).json(course)
  }

  listAll = async (req: Request, res: Response) => {
    const hasAuthenticatedUser = Boolean(req.userId)

    const filter = hasAuthenticatedUser ? undefined : { status: true }

    const courses = await this.service.listAll(filter)
    res.status(200).json({ courses })
  }
}
