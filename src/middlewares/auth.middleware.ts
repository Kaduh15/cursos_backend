import type { NextFunction, Request, Response } from 'express'
import { jwt } from '@/lib/jwt'
import { UnauthorizedError } from '@/utils/http-errors'

export default function authMiddleware(
  { strictBlock }: { strictBlock?: boolean } = { strictBlock: true },
) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const token = req.cookies?.token

    if (!token && !strictBlock) {
      req.userId = null
      return next()
    }

    const payload = jwt.verifyToken(token)

    if (strictBlock && !payload) {
      throw new UnauthorizedError()
    }

    req.userId = payload ? String(payload.sub) : null

    return next()
  }
}
