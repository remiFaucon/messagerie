let express = require('express')
let app = express()
let socket = require('socket.io')

app.set('view engine', 'ejs')

app.use('/assets', express.static('public'))

app.get('/', (req, res) => {
    res.render('pages/index')
})

app.listen(3000)