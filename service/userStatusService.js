// TODO deco reco

let status = {
    connexion: (io, user, id) => {
        if (user.socketId === null) {
            user.socketId = id
            io.emit("newUser", user)
        }
    },
    room: (io, client, connected) => {
        client.on('changeRoom', (user1, user2) => {
            let room
            // TODO modif this
            connected.forEach(user => {
                if (user1 === user.id) {
                    room += user1
                }
                if (user2 === user.id) {
                    room += user2
                }
            })
            if (user1.charCodeAt(0) < user2.charCodeAt(0)){
                room = user1 + user2
            }
            else{
                room = user2 + user1
            }

            client.join(room)
            console.log(room)
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