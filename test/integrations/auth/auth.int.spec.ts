import { faker } from '@faker-js/faker'
import request from 'supertest'
import { describe, expect, it } from 'vitest'
import { app } from '@/app'

describe('Auth Integration Tests', () => {
  it('should register a user successfully', async () => {
    const userData = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: 'StrongP@ssw0rd!',
    }

    const response = await request(app).post('/auth/register').send(userData)

    expect(response.status).toBe(201)
    expect(response.body).toEqual({})

    const cookies = response.headers['set-cookie'] as unknown as Array<string>
    expect(cookies).toBeDefined()
    expect(cookies.find((cookie) => cookie.startsWith('token='))).toBeDefined()
  })

  it('should login a user successfully', async () => {
    const userData = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: 'StrongP@ssw0rd!',
    }

    await request(app).post('/auth/register').send(userData)

    const response = await request(app)
      .post('/auth/login')
      .send({ email: userData.email, password: userData.password })

    expect(response.status).toBe(200)

    const cookies = response.headers['set-cookie'] as unknown as Array<string>
    expect(cookies).toBeDefined()
    expect(cookies.find((cookie) => cookie.startsWith('token='))).toBeDefined()
  })
})
