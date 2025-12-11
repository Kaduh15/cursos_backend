import { Router } from 'express'
import authMiddleware from '@/middlewares/auth.middleware'
import bodyValidationMiddleware from '@/middlewares/body-validation.middleware'
import { UserRepository } from '@/repositories/user.repository'
import { AuthController } from './auth.controller'
import { loginSchema, registerSchema } from './auth.schemas'
import { AuthService } from './auth.service'

const userRepository = new UserRepository()
const authService = new AuthService(userRepository)
const authController = new AuthController(authService)

const authRouter = Router()

authRouter.post(
  '/login',
  bodyValidationMiddleware(loginSchema),
  authController.login,
)

authRouter.post(
  '/register',
  bodyValidationMiddleware(registerSchema),
  authController.register,
)

authRouter.get('/me', authMiddleware(), authController.me)

export { authRouter }
