import express from 'express'
import ToDoController from '../controller/to-do'
const router = express.Router()

router.post('/to-do', (ToDoController.create))

router.get('/to-do', (ToDoController.get))

router.get('/to-do/:id', (ToDoController.getById))

router.delete('/to-do/:id', (ToDoController.delete))

router.put('/to-do/:id', (ToDoController.update))

export { router }
