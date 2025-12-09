import type { Request, Response } from 'express'
import { cookieOptions } from '@/utils/cookie-config'
import { StatusCodes } from '@/utils/https-status-code'
import type { AuthService } from './auth.service'

export class AuthController {
  private service: AuthService

  constructor(service: AuthService) {
    this.service = service
  }

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body

    const { token } = await this.service.login({ email, password })

    res.cookie('token', token, cookieOptions)

    return res.status(StatusCodes.OK).send()
  }

  register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body

    const { token } = await this.service.register({ name, email, password })

    res.cookie('token', token, cookieOptions)

    return res.status(StatusCodes.CREATED).send()
  }
}
