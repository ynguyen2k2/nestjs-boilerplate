import request from 'supertest'
import { HttpStatus, INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { AppModule } from '~/app.module'
import { TESTER_EMAIL, TESTER_PASSWORD } from '../utils/constants'

describe('User Controller E2E Tests', () => {
  let app: INestApplication
  const newUserFirstName = `Tester${Date.now()}`
  const newUserLastName = `E2E`
  const newUserEmail = `User.${Date.now()}@example.com`
  const newUserPassword = `secret`

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()
    app = moduleRef.createNestApplication()
    app.setGlobalPrefix('api/v1')
    // app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
    await app.init()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should register a new user: /api/v1/auth/email/register (POST)', async () => {
    return request(app.getHttpServer())
      .post('/api/v1/auth/email/register')
      .send({
        username: TESTER_EMAIL,
        email: TESTER_PASSWORD,
        firstName: 'Tester',
        lastName: 'E2E',
      })
      .expect(201)
  })
  it('should fail with exists email: /api/v1/auth/email/register (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/v1/auth/email/register')
      .send({
        email: TESTER_EMAIL,
        password: TESTER_PASSWORD,
        firstName: 'Tester',
        lastName: 'E2E',
      })
      .expect(HttpStatus.UNPROCESSABLE_ENTITY)
      .expect(({ body }) => {
        expect(body.errors.email).toBeDefined()
      })
  })

  it('should successfully: /api/v1/auth/email/register (POST)', async () => {
    return request(app.getHttpServer())
      .post('/api/v1/auth/email/register')
      .send({
        email: newUserEmail,
        password: newUserPassword,
        firstName: newUserFirstName,
        lastName: newUserLastName,
      })
      .expect(204)
  })
})
