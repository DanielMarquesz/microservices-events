import { prisma } from '../../config/database/index'
import { IToDo } from '../../models/interfaces/to-do'
import { IOneToDoResponse } from '../../models/interfaces/to-do'
import { logger } from '../../middlewares/logger'
class ToDoRepository {

  async create(data: IToDo) {

    console.log(data)
    logger.debug({
      message:'Creating to-do in Database'
    })
    await prisma.to_do.create({
      data
    })
  }

  async get(user_id: string) {
    logger.debug({
      message:'Getting all to-do items in Database'
    })
    const result = await prisma.to_do.findMany({
      where: { user_id }
    })

    return result
  }

  async getById(id: string): Promise<IOneToDoResponse> {
    logger.debug({
      message:'Getting to-do by id in Database'
    })
    const result = await prisma.to_do.findFirst({
      where: { id }
    })
    return result
  }

  async updated(id: string, data: IToDo) {
    logger.debug({
      message:'Updating to-do by id in Database'
    })
    await prisma.to_do.update({
      where: {
        id
      },
      data
    })
  }

  async delete(id: string) {
    logger.debug({
      message:'Deleting to-do by id in Database'
    })
    await prisma.to_do.delete({
      where: {
        id
      }
    })
  }
}

export = new ToDoRepository()
