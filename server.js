let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let session = require('express-session')
let server = require("http").createServer(app)
let io = require('socket.io')(server)


let connected = [];


app.set('view engine', 'ejs')


// middlewares
app.use('/assets', express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))



// routes
app.get('/', (req, res) => {
    res.render('pages/index')
})

app.post('/', (req, res) => {
    if (req.body.name === undefined || req.body.name.trim() === ""){
        req.session.name = "annonyme"
    }
    else {
        req.session.name = req.body.name
    }
    connected.push({ name: req.session.name, socketId: null })
    res.redirect("/home")
})

app.get('/home', (req, res) => {
    io.sockets.on('connect', (client) => {
        if (connected[connected.length-1].socketId === null){
            connected[connected.length-1].socketId = client.client.conn.id
            io.emit("newUser", connected[connected.length-1])
        }

        client.on('disconnect', () => {
            io.emit('userDisconnect', client.client.conn.id)
            for (let i = 0; i < connected.length; i++) {
                if (connected[i].socketId === client.client.conn.id){
                    connected.splice(i, 1)
                }
            }
        })
    })
    res.render('pages/home', { connected: connected })
})



server.listen(3000)