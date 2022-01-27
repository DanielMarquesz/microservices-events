import { prisma } from '../../config/database/index'
import IUser from '../../models/interfaces/user'
import { NotFoundError } from '../../middlewares/error/errors'

class UserRepository {

  async create(data: IUser) {
    await prisma.users.create({
      data
    })
  }

  async get() {
    const result = await prisma.users.findMany()
    return result
  }

  async getById(id: string) {
    const result = await prisma.users.findFirst({
      where: { id }
    })
    if(!result){
      throw NotFoundError
    }
    return result
  }

  async getByUserId(id: string) {
    const result = await prisma.users.findFirst({
      where: { id }
    })
    return result
  }

  async updated(id: string, data: IUser) {
    await prisma.users.update({
      where: {
        id
      },
      data
    })
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
