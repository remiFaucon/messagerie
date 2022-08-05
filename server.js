let express = require('express')
const userStatus = require("./service/userStatusService");
const chatService = require("./service/chatService");
let app = express()
let server = require("http").createServer(app)
let io = require('socket.io')(server)

let connected = []
let personalId
let rooms = []

app.set('view engine', 'ejs')

// middlewares
require('./middlewares/staticRoutes')(app)
require('./middlewares/bodyParser')(app)
require('./middlewares/socketSession')(app, io)

// routes
require('./controller/indexController')(app, connected)
require('./controller/homeController')(app, connected)


io.sockets.on('connect', (client) => {
    client.emit("thisIsYourId", client.client.conn.id)
    userStatus.connexion(io, connected[connected.length - 1], client.client.conn.id)
    userStatus.room(io, client, connected)
    chatService.newMessage(client)
    chatService.visio(io, client)
    userStatus.deconnection(io, client, connected)
})

server.listen(3000)