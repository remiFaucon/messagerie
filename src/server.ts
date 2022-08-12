import express from "express";
import {userStatus} from './service/userStatusService';
import {chatService} from "./service/chatService";
import {ExpressPeerServer} from "peer";
import {connect} from "mongoose";
import fs from "fs";
import {Server as SocketServer} from "socket.io"
import {config} from "dotenv";
import {createServer} from "https";
import dotenv from "dotenv"
import {User} from "./class/User";
import {Connected} from "./class/Connected";

// Error.stackTraceLimit = Infinity;

const credentials = { key: undefined, cert: undefined }
credentials.key = fs.readFileSync('./src/openssl/192.168.1.120.key', {encoding:'utf8', flag:'r'})
credentials.cert = fs.readFileSync('./src/openssl/192.168.1.120.crt', {encoding:'utf8', flag:'r'})
// const certificate = fs.readFile('./openssl/192.168.1.120.crt', {encoding:'utf8', flag:'r'});

const app = express()
let server = createServer(credentials, app)
const io = new SocketServer(server, {
    cors: {
        origin: "https://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["customHeader"],
    }
})

config()

let env = dotenv.config().parsed

const peerServer = ExpressPeerServer(server, { path: '/visio' });
peerServer.on("connection", () => {})

app.set('view engine', 'ejs')

// middlewares

require('./middlewares/staticRoutes.js')(app, express)
require('./middlewares/bodyParser.js')(app)
require('./middlewares/socketSession.js')(app, io)
app.use('/peerjs', peerServer);

const user = new User()
let status = new userStatus()
// routes
require('./controller/indexController')(app, user)
require('./controller/homeController')(app, Connected)



io.sockets.on('connect', (client) => {
    user.setSocketId(client.id)
    Connected.setUser(user)
    let newUser = Connected.getAllInfo()[Connected.getAllInfo().length - 1]
    io.emit("newUser", newUser)
    client.emit("thisIsYourId", client.id)
    user.unset()

    const chat = new chatService();
    status.room(io, client)
    chat.newMessage(client)
    // chat.getMessages(io, client)
    chat.visio(io, client)
    require('./service/notificationService').notifications(io, client)
    status.disconnect(io, client)

    client.on("error", (err) => {
        console.log(err)
    })
})

connect(env.MONGO_URI)
    .then((result) => {
        server.listen(env.PORT, () => {
            console.log("server listen on port " + env.PORT)
        })
    })
    .catch((err) => console.log(err))



