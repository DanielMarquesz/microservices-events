import express from 'express'
import validateToken from '../middlewares/authorization'
import ToDoController from '../controller/to-do'

const router = express.Router()

router.post('/to-do', validateToken, (ToDoController.create))

router.get('/to-do', validateToken, (ToDoController.get))

router.get('/to-do/:id', validateToken, (ToDoController.getById))

router.delete('/to-do/:id', validateToken, (ToDoController.delete))

router.put('/to-do/:id', validateToken, (ToDoController.update))

export { router }
