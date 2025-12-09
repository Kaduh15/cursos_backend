import { Router } from 'express'
import bodyValidationMiddleware from '@/middlewares/body-validation.middleware'
import { AuthController } from './auth.controller'
import { loginSchama, registerSchema } from './auth.schemas'
import { AuthService } from './auth.service'

const authService = new AuthService()
const authController = new AuthController(authService)

const authRouter = Router()

authRouter.post(
  '/login',
  bodyValidationMiddleware(loginSchama),
  authController.login,
)

authRouter.post('/register',
  bodyValidationMiddleware(registerSchema),
  authController.register,
)

export { authRouter }
