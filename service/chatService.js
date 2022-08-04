let chat = {
    newMessage: (socket, client) => {
        client.on('newMessage', (message, room) => {
            //TODO message in room objcect
            console.log(room)
            client.to(room).emit('youHaveReceiveMsg', message)
        })
    }
}

module.exports = chat