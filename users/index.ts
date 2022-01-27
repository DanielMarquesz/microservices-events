import express, { json, NextFunction } from 'express'
import 'express-async-errors'
import morgan from 'morgan'
import { router } from './src/routes'
import { prismaClient } from './src/config/database/index'
import { postBackUsersIds } from './src/utils/workers/postBackUsersIds'
import generalErrors  from './src/middlewares/error/handler'
import { toHash } from 'ajv/dist/compile/util'

const app = express()

prismaClient()

app.use(json())
app.use(morgan('dev'))
app.use(router)

app.listen(3000, () => {
  try {
    postBackUsersIds()
  } catch (error) {
    throw error
  }
  console.log('The server is running on port 3000')  
})

//@ts-ignore
app.use(generalErrors)

export { app }
