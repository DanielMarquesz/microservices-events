import express, { json } from 'express'
import 'express-async-errors'
import morgan from 'morgan'
import { router } from './src/routes'
import { prismaClient } from './src/config/database/index'

const app = express()

prismaClient()

app.use(json())
app.use(morgan('dev'))
app.use(router)

app.listen(3001, () => console.log('The server is running on port 3001'))
//@ts-ignore
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {  
  console.log(error)
  //@ts-ignore
  res.status(500)
})

export { app }
