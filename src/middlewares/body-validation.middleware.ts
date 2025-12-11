import type { NextFunction, Request, Response } from 'express'
import type { ZodType } from 'zod'

export default function bodyValidationMiddleware(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    const validation = schema.safeParse(req.body)

    if (!validation.success) {
      const errors: {
        [k: string]: string
      } = {}

      validation.error.issues.forEach((issue) => {
        errors[String(issue.path[0])] = issue.message
      })

      return res.status(400).json({ errors })
    }

    req.body = validation.data
    return next()
  }
}
