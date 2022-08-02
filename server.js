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
    connected.push(req.session.name)
    io.emit('newUser', req.body.name)
    res.redirect("/home")
})

app.get('/home', (req, res) => {
    res.render('pages/home', { connected: connected })
})

io.on("userDisconnection", (sock) => {
    console.log(sock)
})


server.listen(3002)