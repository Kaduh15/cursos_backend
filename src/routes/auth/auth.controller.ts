import type { NextFunction, Request, Response } from 'express'
import { StatusCodes } from '@/utils/https-status-code'

import type { AuthService } from './auth.service'

export class AuthController {
  private service: AuthService
  
  constructor(service: AuthService) {
    this.service = service
  }
  
  login = async (req: Request, res: Response) => {
    const { email, password } = req.body
    
    const token = await this.service.login({ email, password })
    
    return res.status(StatusCodes.OK).json(token)
  }

  register = async (req: Request, res: Response) => {
    const { email, password } = req.body
  }
}
