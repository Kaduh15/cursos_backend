import type { CookieOptions } from 'express'

import { env } from '@/env'

const ONE_HOUR_IN_MS = 1000 * 60 * 60

export const cookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: ONE_HOUR_IN_MS,
} satisfies CookieOptions
