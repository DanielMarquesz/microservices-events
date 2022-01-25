import { prisma } from '../../config/database/index'
import IUser from '../../models/interfaces/user'
import RabbitmqServer from '../../config/rabbitmq'



class UserRepository {

  async create(data: IUser) {    

    try {
      await prisma.users.create({
        data
      })
    } catch (error) {
      throw error
    }
  }

  async get() {
    const result = await prisma.users.findMany()
    return result
  }

  async getById(id: string) {
    const result = await prisma.users.findFirst({
      where: { id }
    })

    return result
  }

  async getByUserId(id: string) {
    const result = await prisma.users.findFirst({
      where: { id }
    })
    return result
  }

  async updated(id: string, data: IUser) {
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

  async delete(id: string) { 
    await prisma.users.delete({
      where: { 
        id
      }
    })        
  }
}

export default new UserRepository()