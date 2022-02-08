import { app } from '../../src/config/server'
import request from 'supertest'

describe('Test all routes', () => {
  jest.setTimeout(30000)
  it('Should get all users in db', async () => {
    const response = await request(app).get('/users')
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    expect(JSON.parse(response.text)).toEqual({
      result: [
        {
          birthdate: '04/09/1997',
          id: '3812f5dd-2432-4eaa-96f4-51b050d7bee0',
          name: 'Daniel Marques ',
        },
        {
          birthdate: '04/09/1997',
          id: 'b5ade2c0-8152-11ec-a8a3-0242ac120002',
          name: 'Daniel Marques',
        },
      ],
    })

  })
})
