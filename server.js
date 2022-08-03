let express = require('express')
let app = express()
let server = require("http").createServer(app)
let io = require('socket.io')(server)

let connected = [];

app.set('view engine', 'ejs')

// middlewares
require('./middlewares/staticRoutes')(app)
require('./middlewares/bodyParser')(app)
require('./middlewares/socketSession')(app, io)

// routes
require('./controller/indexController')(app, connected)
require('./controller/homeController')(app, io, connected)

server.listen(3000)