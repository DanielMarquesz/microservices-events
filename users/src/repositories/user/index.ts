import { prisma } from '../../config/database/index'
import IUser from '../../models/interfaces/user'
import { NotFoundError } from '../../middlewares/error/types'
import { logger } from '../../middlewares/logger'

class UserRepository {

  async create(data: IUser) {
    logger.debug({
      message:'Creating a user in Database'
    })

    await prisma.users.create({
      data
    })
  }

  async get() {
    logger.debug({
      message:'Getting users in Database'
    })

    const result = await prisma.users.findMany()
    return result
  }

  async getById(id: string) {
    logger.debug({
      message:'Getting user by id in Database'
    })

    const result = await prisma.users.findFirst({
      where: { id }
    })
    if(!result){
      throw NotFoundError
    }
    return result
  }

  async updated(id: string, data: IUser) {
    logger.debug({
      message:'Updating user by id in Database'
    })

    await prisma.users.update({
      where: {
        id
      },
      data
    })
  }

  async delete(id: string) {
    logger.debug({
      message:'Deleting user by id in Database'
    })

    await prisma.users.delete({
      where: {
        id
      }
    })
  }
}

export default new UserRepository()
