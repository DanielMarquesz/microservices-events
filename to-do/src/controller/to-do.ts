import { 
  NextFunction,
  Request,
  Response
} from 'express'
import { IToDo } from '../models/interfaces/to-do'
import todoRepository from '../repositories/to-do'
import rabbitMqInstance from '../subscribers/rabbitmq'

class ToDoController {    
 
  async create(req: Request, res: Response, next: NextFunction):Promise<void> {

    const data: IToDo = req.body      
    await todoRepository.create(data)
    res.json({
      created: data
    })
  }

  async get(req: Request, res: Response, next: NextFunction): Promise<void> {        
    
    const result = await todoRepository.get()
    res.json({
      result
    })
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {        
    const { 
      id
    } = req.params

    let user
  
    const task = await todoRepository.getById(id)

    await rabbitMqInstance.start()
    await rabbitMqInstance.publishInQueue('todo', JSON.stringify({task}))
       
    await rabbitMqInstance.consumeQueue('user', async (message) => {
      // @ts-ignore
      user = await JSON.parse(message.content)
      console.log("CONTEÚDO:", user)
      console.log('postback recebido: ', task)
    })

    // await rabbitMqInstance.closeChannel()
    res.json({
      task,
      user
    })
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    
    const {
      id
    } = req.params    

    const data: IToDo = req.body

    await todoRepository.updated(id, data)

    res.json({
      updated: data
    })
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    
    const {
      id
    } = req.params

    try {
      await todoRepository.delete(id)   

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