import express from 'express'
import UserController from '../controller/user'
import validateToken from '../middlewares/authorization'
const router = express.Router()

router.post('/users', (UserController.create))

router.get('/users', (UserController.get))

router.get('/users/:id', validateToken, (UserController.getById))

router.delete('/users/:id', validateToken, (UserController.delete))

router.put('/users/:id', validateToken, (UserController.update))

router.post('/users/login', (UserController.sigin))

export { router }
