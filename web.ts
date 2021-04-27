import * as express from 'express'
import * as http from 'http'
import { Server } from 'socket.io'
import axios from 'axios'

import router from './router'

const PORT = 8080
const app = express()
app.use('/', router)

const server = http.createServer(app)
const io = new Server(server)

app.get('/channel', (req, res) => {
  res.sendFile(__dirname + '/src/template/channel.html')
})

app.get('/dm', (req, res) => {
  res.sendFile(__dirname + '/src/template/dm.html')
})

//how socketio works
const channel = io.of('channel')
const dm = io.of('dm')
channel.on('connection', (socket) => {
  let userId
  let roomId

  socket.on('enter', (data) => {
    userId = data.userId
    roomId = data.roomId

    socket.join(roomId)

    channel.to(roomId).emit('chat message', `${userId}가 입장하였습니다.`)
  })

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg)
    channel.to(roomId).emit('chat message', `${userId} : ${msg}`)
  })

  socket.on('force disconnect', () => {
    socket.disconnect()
  })

  socket.on('disconnect', async () => {
    console.log(userId)
    console.log('user disconnected')
    await axios.put('http://ec2-13-209-18-10.ap-northeast-2.compute.amazonaws.com:3000/user/leave', {
      userId
    })
    channel.to(roomId).emit('chat message', `${userId}가 퇴장하였습니다.`)
  })
})

dm.on('connection', (socket) => {
  let userId
  let roomId

  socket.on('enter', (data) => {
    userId = data.userId
    roomId = data.roomId

    socket.join(roomId)

    dm.to(roomId).emit('chat message', `${userId}가 입장하였습니다.`)
  })

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg)
    dm.to(roomId).emit('chat message', `${userId} : ${msg}`)
  })

  socket.on('force disconnect', () => {
    socket.disconnect()
  })

  socket.on('disconnect', async () => {
    console.log(userId)
    console.log('user disconnected')
  })
})


server.listen(PORT, () => {
  console.log('listening on port')
  console.log('nodemon')
  console.log(PORT)
})

