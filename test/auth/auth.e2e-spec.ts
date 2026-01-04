import request from 'supertest'
import { ADMIN_EMAIL, ADMIN_PASSWORD, APP_URL } from '../utils/constants'

type responseBody = {
  token: string
  user: {
    email: string
    roles: string
  }
}
describe('Auth', () => {
  const app = APP_URL

  describe('Admin', () => {
    it('should login successfully via api/v1/auth/email/login', async () => {
      return request(app)
        .post('/api/v1/auth/email/login')
        .send({
          email: ADMIN_EMAIL,
          password: ADMIN_PASSWORD,
        })
        .expect(201)
        .expect((body: responseBody) => {
          expect(body.token).toBeDefined()
          expect(body.user.email).toBe(ADMIN_EMAIL)
          expect(body.user.roles).toContain('admin')
        })
    })
  })
})
