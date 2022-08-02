let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let session = require('express-session')
let socket = require('socket.io')


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
    res.redirect("/home")
})


app.listen(3000)