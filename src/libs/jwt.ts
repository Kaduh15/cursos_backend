import jwtLib from 'jsonwebtoken'
import { env } from '@/env'

const secret = env.JWT_SECRET

export const jwt = {
  createToken: (payload: object): string => {
    return jwtLib.sign(payload, secret, { expiresIn: '1h' })
  },

  verifyToken: (token: string): object | string => {
    return jwtLib.verify(token, secret)
  },
}
