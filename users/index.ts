import express, { json } from 'express'
import 'express-async-errors'
import morgan from 'morgan'
import { router } from './src/routes'
import { prismaClient } from './src/config/database/index'
import listenTodoMessages from './src/utils/workers/consumers/index'
import errorHandler  from './src/middlewares/error/handler'

const app = express()

prismaClient()

app.use(json())
app.use(morgan('dev'))
app.use(router)

app.listen(3000, () => {
  listenTodoMessages()
  // console.log('The server is running on port 3000')
})

app.use(errorHandler)

export { app }
