let status = {
    connexion: (io, user, id) => {
        if (!user){
            io.emit("notConnected")
            // TODO deco reco
        }
        else if (user.socketId === null) {
            user.socketId = id
            io.emit("newUser", user)
        }
    },
    room: (io, client) => {
        client.on('changeRoom', (user1, user2) => {
            let room = user1.charCodeAt(0) < user2.charCodeAt(0) ? user1 + user2 : user2 + user1
            client.join(room)
            client.emit('connectToRoom', room)
        })
    },
    deconnection: (io, client, connected) => {
        client.on('disconnect', () => {
            io.emit('userDisconnect', client.client.conn.id)
            for (let i = 0; i < connected.length; i++) {
                if (connected[i].socketId === client.client.conn.id) {
                    connected.splice(i, 1)
                }
            }
        })
    }
}

module.exports = status