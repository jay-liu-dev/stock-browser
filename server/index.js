require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const http = require('http')
const socketIo = require('socket.io')
const socketManager = require('./app/services/socket')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*')

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  )

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true)

  // Pass to next layer of middleware
  next()
})
app.use('/api', require('./app/controllers'))

const server = http.createServer(app)
const io = socketIo(server)
const port = process.env.PORT || 3001

socketManager(io)

server.listen(port, () => {
  console.log('✔ Express server listening on port %d', port)
})
