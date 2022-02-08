import express, { json } from 'express'
import 'express-async-errors'
import morgan from 'morgan'
import { router } from '../routes'
import { prismaClient } from '../config/database/index'
import errorHandler  from '../middlewares/error/handler'

const app = express()

prismaClient()

app.use(json())
app.use(morgan('dev'))
app.use(router)
app.use(errorHandler)

export { app }
