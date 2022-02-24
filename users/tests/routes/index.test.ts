import { app } from '../../src/config/server'
import { prisma } from '../../src/config/database/index'
import request from 'supertest'

describe('Test all routes', () => {
  jest.setTimeout(30000)
  let id: string

  beforeAll(async ()=> {
    await prisma.users.deleteMany()
  })

  it('Should create one users in db', async () => {
    await request(app)
      .post('/users')
      .send({
        'name': 'Silva Correia da Conceição Marques',
        'birthdate': '04/09/1997'
      })
      .expect(201)
  })

  it('Should get all users in db', async () => {
    const response = await request(app)
      .get('/users')
    //@ts-ignore
    const parseResponse = JSON.parse(response.text)
    //@ts-ignore
    id = parseResponse.result[0].id
    expect(JSON.parse(response.text))
      .toStrictEqual({
        result: [
          {
            birthdate: '04/09/1997',
            id,
            name: 'Silva Correia da Conceição Marques'
          },
        ],
      })
  })

  it('Should update one users in db', async () => {
    await request(app)
      .put(`/users/${id}`)
      .send({
        'name': 'Silva Correia da Conceição Pedro',
        'birthdate': '04/09/1997'
      }).expect(200)
  })

  it('Should get one users in db', async () => {
    const response = await request(app)
      .get(`/users/${id}`)
      .expect(200)

    expect(JSON.parse(response.text))
      .toStrictEqual({
        result: {
          birthdate: '04/09/1997',
          id,
          name: 'Silva Correia da Conceição Pedro',
        },
      })
  })

  it('Should delete one users in db', async () => {
    await request(app)
      .delete(`/users/${id}`)
      .expect(200)
  })
})
