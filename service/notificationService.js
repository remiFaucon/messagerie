let system = require('../service/systemService')

function call(io, client) {
    client.on('call', (roomId) => {
        if (roomId !== null) {
            let userId = system.getOtherIdFromRoomId(roomId, client.id)
            if (Array.from(io.sockets.adapter.rooms.get(roomId).values()).indexOf(userId) === -1) {
                io.to(userId).emit('callNotification', client.id)
            } else {
                client.to(roomId).emit("MsgNotification", "call", client.id)
            }
        }
    })
}

function message(io, client) {
    client.on("newMessage", (message, roomId) => {
        let userId = system.getOtherIdFromRoomId(roomId, client.id)
        if (Array.from(io.sockets.adapter.rooms.get(roomId).values()).indexOf(userId) === -1){
            io.to(userId).emit('messageNotification', client.id)
        }
    })
}

module.exports = {
    notifications: (io, client) => {
        call(io, client)
        message(io, client)
    }
}