const userStatus = require("../service/userStatusService");
const chatService = require("../service/chatService");



module.exports = (app, io, romms, connected) => {
    app.get('/home', (req, res) => {
        io.sockets.on('connect', (client) => {
            client.emit("thisIsYourId", client.client.conn.id)
            userStatus.connexion(io, connected[connected.length - 1], client.client.conn.id)
            userStatus.room(io, client, connected)
            chatService.newMessage(io, client)
            userStatus.deconnection(io, client, connected)
        })

        res.render('pages/home', { connected: connected })
    })
}