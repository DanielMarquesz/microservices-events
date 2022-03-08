import { prisma } from '../../config/database/index'
import { IUser } from '../../models/interfaces/user'
import authUtil from '../../utils/auth/bcrypt'
import { logger } from '../../middlewares/logger'
import Format from '../../utils/format'

class UserRepository {
  async create(data: IUser) {
    logger.debug({
      message:'Creating a user in Database'
    })
    // Usar metódo get by Email
    const result = await prisma.users.findFirst({
      where: { email: data.email }
    })

    if(result) {
      throw new Error('Error while creating user!')
    }

    data.password =  await authUtil.hashPassword(data.password)

    await prisma.users.create({
      data
    })
  }

  async get() {
    logger.debug({
      message:'Getting users in Database'
    })

    const results = await prisma.users.findMany()

    const formatedResult = Format.responseGet(results)

    return formatedResult
  }

  async getById(id: string) {
    logger.debug({
      message:'Getting user by id in Database'
    })

    const result = await prisma.users.findFirst({
      where: { id }
    })
    if(!result){
      throw new Error('User not found!')
    }

    const formatedResult = Format.responseGetOne(result)

    return formatedResult
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

  async getByEmail(email: string) {
    logger.debug({
      message:'Getting user by email in Database'
    })

    const result = await prisma.users.findFirst({
      where: { email }
    })
    if(!result){
      throw new Error('User not found!')
    }
    return result
  }
}

export default new UserRepository()
