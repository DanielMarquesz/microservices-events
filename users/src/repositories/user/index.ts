import { prisma } from '../../config/database/index'
import IUser from '../../models/interfaces/user'
import RabbitmqServer from '../../config/rabbitmq'



class UserRepository {

  async create (data: IUser) {    

    try {
      // await MqServer.start()
      // await MqServer.publishInQueue('todo', JSON.stringify(data))
      // await MqServer.publishInExchange('amq.direct', 'rota', JSON.stringify(data))
      await prisma.users.create({
        data
      })
    } catch (error) {
      throw error
    }
  }

  async get () {
    const result = await prisma.users.findMany()
    return result
  }

  async getById (id: string) {
    const result = await prisma.users.findFirst({
      where: { id }
    })

    return result
  }

  async getByUserId (id: string) {
    const result = await prisma.users.findFirst({
      // @ts-ignore - Olhar
      where: { id }
    })
    console.log('Olhando DB User')
    return result
  }

  async updated (id: string, data: IUser) {
    try {
      await prisma.users.update({
        where: { 
          id
        },
        data
      })
    } catch (error) {
      throw error
    }
  }

  async delete (id: string) { 
    await prisma.users.delete({
      where: { 
        id
      }
    })        
  }
}

export default new UserRepository()