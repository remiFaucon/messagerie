const session = require("express-session");

const wrap = middleware => (socket, next) => middleware(socket.request, {}, next)

const sessionMiddleware = session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
})

module.exports = (app, io) => {
    app.use(sessionMiddleware)
    io.use(wrap(sessionMiddleware))
    io.use((socket, next) => {
        const session = socket.request.session
        if (session) {
            next()
        }
    })
}
