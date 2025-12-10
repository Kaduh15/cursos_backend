import argon2 from 'argon2'

export async function createHash(text: string): Promise<string> {
  return await argon2.hash(text)
}

export async function compareHash(hashedText: string, plainText: string) {
  return await argon2.verify(hashedText, plainText)
}
