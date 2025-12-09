import { crypt } from '@/libs/crypt'
import { jwt } from '@/libs/jwt'
import { UserRepository } from '@/repositories/user.repository'
import { BadRequestError, UnauthorizedError } from '@/utils/http-errors'
import type { LoginSchema, RegisterSchema } from './auth.schemas'

export class AuthService {
  private auth = jwt
  private model = UserRepository

  async login(data: LoginSchema) {
    const user = await this.model.getByEmail(data.email)
    if (!user) {
      throw new UnauthorizedError('Credentials invalid')
    }

    const isPasswordValid = await crypt.compare(data.password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedError('Credentials invalid')
    }

    const token = this.auth.createToken({ sub: user.id })

    return { token }
  }

  async register(data: RegisterSchema) {
    const existingUser = await this.model.getByEmail(data.email)

    if (existingUser) {
      throw new BadRequestError('Email already in use')
    }

    const hashedPassword = await crypt.hash(data.password)

    const user = await this.model.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    })

    const token = this.auth.createToken({ sub: user.id })

    return { token }
  }
}
