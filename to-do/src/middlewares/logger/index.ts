import winston from 'winston'

export const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      level:'debug',
    }),
    new winston.transports.Console({
      level:'info',
    }),
    new winston.transports.Console({
      level:'warn',
    }),
    new winston.transports.Console({
      level:'error',
    }),
  ]
})
