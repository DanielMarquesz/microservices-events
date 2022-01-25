import { 
  NextFunction,
  Request,
  Response
} from 'express'
import IUser from '../models/interfaces/user'
import userRepository from '../repositories/user'

class UserController {    
 
  async create(req: Request, res: Response, next: NextFunction) {

    try {
      const data: IUser = req.body    
    
      await userRepository.create(data)
  
      res.json({
        created: data
      })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {        
    
    try {
      const result = await userRepository.get()

      res.json({
        result
      })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {        

    try {
      const {
        id
      } = req.params
    
      const result = await userRepository.getById(id)    
  
      res.json({
        result 
      })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    
    const {
      id
    } = req.params
    
    const data: IUser = req.body

    await userRepository.updated(id, data)

    res.json({
      updated: data
    })
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    
    const {
      id
    } = req.params

    try {
      await userRepository.delete(id)   

      res.json({
        message: 'Deleted',
        id,      
      })

    } catch (error) {      
      next(error)
    }     
  }
}

export = new UserController()