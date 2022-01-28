import {
  Request,
  Response
} from 'express'
import { IError } from '../../models/interfaces/error'
import { NotFoundError } from './types'

const generalErrors = async (
  err: IError,
  _req: Request,
  res: Response,
) => {

  if(err.message === NotFoundError.message){
    res.send(404).json({
      message: err.message
    })
  }

  if(err.status >= 500 || err.status <= 599){
    res.send(err.status).json({
      message: err.message
    })
  }

  if(err.status >= 400 || err.status <= 499){
    res.send(err.status).json({
      message: err.message
    })
  }

  if(err.status >= 300 || err.status <= 308){
    res.send(err.status).json({
      message: err.message
    })
  }

  res.status(500).json({
    error: err,
    message: err.message
  })
}

export default generalErrors
