import express from 'express'
import UserController from '../controller/user'
const router = express.Router()

router.post('/users', (UserController.create))

router.get('/users', (UserController.get))

router.get('/users/:id', (UserController.getById))

router.delete('/users/:id', (UserController.delete))

router.put('/users/:id', (UserController.update))

export { router }
