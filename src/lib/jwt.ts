import jwtLib, { type JwtPayload } from 'jsonwebtoken'
import { env } from '@/env'

const secret = env.JWT_SECRET

export const jwt = {
  createToken: (payload: object): string => {
    return jwtLib.sign(payload, secret, { expiresIn: '1h' })
  },

  verifyToken: (token: string): JwtPayload | string | null => {
    try {
      return jwtLib.verify(token, secret)
    } catch {
      return null
    }
  },
}
