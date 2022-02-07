import { app } from '../../index'
import request from 'supertest'


describe('Should test all routes', () => {

  it('', async () => {
    const response = await request(app).get('/users')
    await expect(response).resolves.toBe({})
  })
})
