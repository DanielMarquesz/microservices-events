import {
  NextFunction,
  Request,
  Response
} from 'express'
import jwt from 'jsonwebtoken'

const validateTokens = async (req: Request, res: Response, next: NextFunction) => {

  const token = req.headers['x-access-token'] || req.body.token

  if (!token) {
    res.status(403).send('Token not provided')
  }

  const decoded =  await jwt.verify(token, process.env.JWT_SECRET)

  if(!decoded) {
    res.status(403).send('Invalid token supplied')
  }

  res.locals.jwt_token = decoded
  next()
}

export default validateTokens
