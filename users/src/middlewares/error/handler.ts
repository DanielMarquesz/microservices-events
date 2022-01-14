// import express from "express"

// const app = express()

class Handler {  

  async generalErrors (error:any, req:any, res:any, next:any){    
  
    if(error.meta.cause === 'Record to delete does not exist.'){
      res.status(404).json({
        message: 'Record not found to delete.'
      })

      next()
    }  
  
    res.status(500).json({
      message: error.meta.cause
    })

    next()
  }

  async routeErrors (req: any, res:any, next: any) {
    
    const error = new Error("Route not found")

    res.status(404).json({
      error: error.message
    })
  }
}

export = new Handler()