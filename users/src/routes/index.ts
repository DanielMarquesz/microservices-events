import express from 'express'
import UserController from '../controller/user'
import validateTokens from '../middlewares/authorization'
const router = express.Router()

router.post('/users', (UserController.create))

router.get('/users', (UserController.get))

router.get('/users/:id', validateTokens, (UserController.getById))

router.delete('/users/:id', (UserController.delete))

router.put('/users/:id', (UserController.update))

router.post('/users/login', (UserController.sigin))

export { router }
