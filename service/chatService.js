let chat = {
    newMessage: (client) => {
        client.on('newMessage', (message, room) => {
            //TODO message in room objcect
            client.to(room).emit('youHaveReceiveMsg', message)
        })
    }
}

module.exports = chat