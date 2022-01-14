import express from 'express'
import UserController from '../controller/user'
import errorHandler from '../middlewares/error/handler'
const router = express.Router()

router.post('/users', (UserController.create))

router.get('/users', (UserController.get))

router.get('/users/:id', (UserController.getById))

router.delete('/users/:id', (UserController.delete))

router.put('/users/:id', (UserController.update))

router.use(errorHandler.routeErrors)

router.use(errorHandler.generalErrors)

export { router }
