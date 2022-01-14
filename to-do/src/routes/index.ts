import express from 'express'
import ToDoController from '../controller/to-do'
import errorHandler from '../middlewares/error/handler'
const router = express.Router()

router.post('/to-do', (ToDoController.create))

router.get('/to-do', (ToDoController.get))

router.get('/to-do/:id', (ToDoController.getById))

router.delete('/to-do/:id', (ToDoController.delete))

router.put('/to-do/:id', (ToDoController.update))

router.use(errorHandler.routeErrors)

router.use(errorHandler.generalErrors)

export { router }
