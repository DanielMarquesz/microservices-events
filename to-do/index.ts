import express, { json } from 'express'
import 'express-async-errors'
import { router } from './src/routes'
import { prismaClient } from './src/config/database/index'
import errorHandler  from './src/middlewares/error/handler'

const app = express()

prismaClient()
app.use(json())
app.use(router)

app.listen(3001, () => console.log('The server is running on port 3001'))

app.use(errorHandler)

export { app }
