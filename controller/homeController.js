const userStatus = require("../service/userStatusService");
const chatService = require("../service/chatService");

module.exports = (app, io, romms, connected) => {
    app.get('/home', (req, res) => {
        console.log("e")
        io.sockets.on('connect', (client) => {
            // TODO le pb vien dici
            console.log('r')
            client.emit("thisIsYourId", client.client.conn.id)
            userStatus.connexion(io, connected[connected.length - 1], client.client.conn.id)
            userStatus.room(io, client, connected)
            chatService.newMessage(client)
            userStatus.deconnection(io, client, connected)
        })

        res.render('pages/home', { connected: connected })
    })
}