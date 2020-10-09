
const express = require('express')
const app = express()
const port = 3000



//su dung co ban
const winston = require('winston')
// winston.log('info', 'Hello anonystick.com!')
// winston.info('Hello anonystick.com')//


// Tao nhieu phien ban khac nhau

// const logger1 = winston.createLogger()
// const logger2 = winston.createLogger()
// logger1.info('logger1', 'Hello anonystick.com!')
// logger2.info('logger2', 'Hello anonystick.com!')

// luu vao mot file de de quan lys

// const logger = winston.createLogger({
//     transports: [
//       new winston.transports.Console(),
//       new winston.transports.File({filename: 'combined.log'})
//     ]
//   })

//4 kenh 


// 
// logger.info('winston transports')


const { Writable } = require('stream')
const stream = new Writable({
    objectMode: false,
    write: raw => console.log('stream msg>>>', raw.toString())
})

const http = require('http')
http
  .createServer((req, res) => {
    const arr = []
    req
      .on('data', chunk => arr.push(chunk))
      .on('end', () => {
        const msg = Buffer.concat(arr).toString()
        console.log('http msg', msg)
        res.end(msg)
      })
  })
  .listen(8080)

const path = require('path')

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.label({ label: 'right meow!' }),
        winston.format.timestamp(),
        winston.format.prettyPrint(),
        winston.format.printf((info) => {
            return `[do whatever you want] ${info.timestamp}:${info.label}:${info.message}`
        })
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            level: 'info',
            format:  winston.format.printf((info) => {
                return `[do whatever you want] ${info.timestamp}:${info.label}:${info.message}`
            }),
            filename: 'info.log',
            maxsize: 1
          }),
        new winston.transports.Http({host: 'localhost', port: 8080}),
        new winston.transports.Stream({ stream })
    ]
})
logger.info('winston transports')
/*
    
*/

app.get('/', (req, res) => {
    logger.info('Chung no dang reload lien tuc')
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
