import {
  NextFunction,
  Request,
  Response
} from 'express'
import { IToDo } from '../models/interfaces/to-do'
import todoRepository from '../repositories/to-do'
import rabbitMqInstance from '../subscribers/rabbitmq'
import { logger } from '../middlewares/logger'

class ToDoController {

  async create(req: Request, res: Response, next: NextFunction):Promise<void> {
    logger.debug({
      message:'Request sent for create to-do'
    })
    try {
      const data: IToDo = req.body
      data.user_id = res.locals.jwt_token.user.id
      await todoRepository.create(data)

      logger.info({
        message:'Response recieved for create to-do'
      })

      res.json({
        created: data
      })
    } catch (error) {
      next(error)
    }
  }

  async get(req: Request, res: Response, next: NextFunction): Promise<void> {

    logger.debug({
      message:'Request sent for get all to-do items'
    })
    try {
      const result = await todoRepository.get()
      console.log(res.locals.jwt_token.user)
      logger.info({
        message:'Response recieved for get all to-do items'
      })

      res.json({
        result
      })
    } catch (error) {
      next(error)
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    let user

    logger.debug({
      message:'Request sent for get to-do by id'
    })

    try {

      const {
        id
      } = req.params

      const task = await todoRepository.getById(id)

      if(!task) {
        throw new Error('Task not found!')
      }

      await rabbitMqInstance.start()
      await rabbitMqInstance.publishInQueue('todo', JSON.stringify({ task }))

      await rabbitMqInstance.consumeQueue('user', async (message) => {
        user = await JSON.parse(message.content.toString())
        console.log(user)
        if(user === 0) {
          next(new Error('user_id not found'))
        }
        task.user_name = user.full_name
        task.birthdate = user.birthdate

        logger.info({
          message:'Response recieved for get to-do by id'
        })

        res.json({
          task,
        })
      })
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
      const {
        id
      } = req.params

      logger.debug({
        message:'Request sent for update to-do by id'
      })

      const data: IToDo = req.body
      await todoRepository.updated(id, data)

      logger.info({
        message:'Response recieved for update to-do by id'
      })

      res.json({
        updated: data
      })
    } catch (error) {
      next(error)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
      const {
        id
      } = req.params

      logger.debug({
        message:'Request sent for delete to-do by id'
      })

      await todoRepository.delete(id)

      logger.info({
        message:'Response recieved for delete to-do by id'
      })

      res.json({
        message: 'Deleted',
        id,
      })
    } catch (error) {
      next(error)
    }
  }
}

export = new ToDoController()
