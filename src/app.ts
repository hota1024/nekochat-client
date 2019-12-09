import * as http from 'http'
import socketio, { Socket } from 'socket.io'
import { Message } from './types/message'
import { MaClient } from './ma'
import { Nekolizer } from './nekolizer'

const server = http.createServer()
const io = socketio(server)
const appId = process.env.YAHOO_APP_ID as string

const maClient = new MaClient(appId)
const nekolizer = new Nekolizer(maClient)

io.on('connection', (socket: Socket) => {
  socket.on('message', async (message: Message) => {
    if (message.content.length > 100) return
    const content = await nekolizer.nekolize(message.content)
    io.sockets.emit('message', {
      ...message,
      content
    })
  })
})

server.listen(80)
console.log('Server is running.')
