import { crypt } from '@/libs/crypt'
import { jwt } from '@/libs/jwt'
import { UserRepository } from '@/repositories/user.repository'
import { NotFoundError, UnauthorizedError } from '@/utils/http-errors'
import type { LoginSchema } from './auth.schemas'

export class AuthService {
  private auth = jwt
  private model = UserRepository

  async login(data: LoginSchema) {
    const user = await this.model.getByEmail(data.email)
    if (!user) {
      throw new NotFoundError('User not found')
    }

    const isPasswordValid = await crypt.compare(data.password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid password')
    }

    const token = this.auth.createToken({ sub: user.id })

    return { token }
  }
}
