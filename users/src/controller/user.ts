import {
  NextFunction,
  Request,
  Response
} from 'express'
import IUser from '../models/interfaces/user'
import userRepository from '../repositories/user'
import { logger } from '../middlewares/logger'
import authUtil from '../utils/auth/bcrypt/index'

class UserController {

  async create(req: Request, res: Response, next: NextFunction) {

    logger.debug({
      message:'Request sent for create user'
    })

    try {
      const data: IUser = req.body
      //@ts-ignore
      await userRepository.create(data)

      logger.info({
        message:'Response recievied for create user'
      })

      res.sendStatus(201)
    } catch (error) {
      next(error)
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {

    logger.debug({
      message:'Request for get all users'
    })

    try {
      const result = await userRepository.get()

      logger.info({
        message:'Response for get all users'
      })

      res.json({
        result
      })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {

    logger.debug({
      message:'Request for get one user'
    })

    try {
      const {
        id
      } = req.params

      const result = await userRepository.getById(id)

      logger.info({
        message:'Response for get one user'
      })

      res.json({
        result
      })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {

    logger.debug({
      message:'Request for update one user'
    })

    try {
      const {
        id
      } = req.params

      const data: IUser = req.body

      await userRepository.updated(id, data)

      logger.info({
        message:'Response for update one user'
      })

      res.json({
        updated: data
      })
    } catch (error) {
      next(error)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {

    logger.debug({
      message:'Request for delete one user'
    })

    const {
      id
    } = req.params

    try {
      await userRepository.delete(id)

      logger.info({
        message:'Response for delete one user'
      })

      res.json({
        message: 'Deleted',
        id,
      })

    } catch (error) {
      next(error)
    }
  }

  async sigin(req: Request, res: Response, next: NextFunction) {

    logger.debug({
      message:'Request for sigin'
    })

    try {
      const {
        email,
        password
      } = req.body

      const result = await authUtil.comparePassword(password, email)

      logger.info({
        message:'Response for sigin'
      })

      res.json(result).status(200)

    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}

export = new UserController()
