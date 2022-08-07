
function call(io, client) {
    client.on('call', (userid) => {
        console.log(userid)
        io.to(userid).emit('callNotification', client.id)
    })
}

module.exports = {
    notifications: (io, client) => {
        call(io, client)
    }
}