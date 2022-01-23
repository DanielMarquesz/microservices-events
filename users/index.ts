import express, { json } from 'express'
import morgan from 'morgan'
import { router } from './src/routes'
import { prismaClient } from './src/config/database/index'
import { postBackUsersIds } from './src/utils/workers/postBackUsersIds'

const app = express()

prismaClient()

app.use(json())
app.use(morgan('dev'))
app.use(router)

app.listen(3000, () => {
  postBackUsersIds()
  console.log('The server is running on port 3000')  
})



export { app }
