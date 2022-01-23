import { prisma } from '../../config/database/index'
import { IToDo } from '../../models/interfaces/to-do'
import { IOneToDoResponse } from '../../models/interfaces/onde-to-do-response'

class ToDoRepository {

  async create(data: IToDo) {
    try {
      await prisma.to_do.create({
        data
      })
    } catch(error) {
      throw error
    }
  }

  async get() {
    const result = await prisma.to_do.findMany()
    return result
  }

  async getById(id: string): Promise<IOneToDoResponse> {
    const result = await prisma.to_do.findFirst({
      where: { id }
    })

    return result
  }

  async updated(id: string, data: IToDo) {
    try {
      await prisma.to_do.update({
        where: { 
          id
        },
        data
      })
    } catch(error) {
      throw error
    }
  }

  async delete(id: string) { 
    await prisma.to_do.delete({
      where: { 
        id
      }
    })        
  }
}

export = new ToDoRepository()