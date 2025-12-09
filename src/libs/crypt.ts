import { hash, verify } from 'argon2'

export const crypt = {
  hash: async (text: string) => {
    return hash(text)
  },
  compare: async (text: string, hash: string) => {
    return verify(hash, text)
  },
}
