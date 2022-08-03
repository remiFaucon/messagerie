const userStatus = require("../service/userStatusService");

let rooms = []

module.exports = (app, io, connected) => {
    app.get('/home', (req, res) => {
        io.sockets.on('connect', (client) => {
            client.emit("thisIsYourId", client.client.conn.id)
            userStatus.connexion(io, connected[connected.length - 1], client.client.conn.id)
            userStatus.room(io, client, connected)
            userStatus.deconnection(io, client, connected)
        })

        res.render('pages/home', { connected: connected })
    })
}