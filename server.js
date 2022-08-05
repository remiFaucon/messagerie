const express = require('express')
const userStatus = require("./service/userStatusService")
const chatService = require("./service/chatService")
const app = express()
const { ExpressPeerServer } = require('peer');

const fs = require('fs')
const privateKey = fs.readFileSync('openssl/192.168.1.120.key', 'utf8');
const certificate = fs.readFileSync('openssl/192.168.1.120.crt', 'utf8');
const creadentials = { key: privateKey, cert: certificate }

const server = require("https").createServer(creadentials, app)
// const server = require("http").createServer(app)
const io = require('socket.io')(server)

const connected = []
const calls = []

const peerServer = ExpressPeerServer(server, {
    debug: true,
    path: '/visio'
});

peerServer.on("connection", () => {
    console.log("peer ok")
})

app.set('view engine', 'ejs')

// middlewares
require('./middlewares/staticRoutes')(app)
require('./middlewares/bodyParser')(app)
require('./middlewares/socketSession')(app, io)
app.use('/peerjs', peerServer);


// routes
require('./controller/indexController')(app, connected)
require('./controller/homeController')(app, connected)



io.sockets.on('connect', (client) => {
    client.emit("thisIsYourId", client.client.conn.id)
    userStatus.connexion(io, connected[connected.length - 1], client.client.conn.id)
    userStatus.room(io, client, connected)
    chatService.newMessage(client)
    chatService.visio(io, calls, client)
    userStatus.deconnection(io, client, connected)
})

server.listen(3000)

