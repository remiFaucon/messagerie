const cv = require('opencv4nodejs')

const chat = {
    newMessage: (client) => {
        client.on('newMessage', (message, room) => {
            //TODO message in room objcect
            client.to(room).emit('youHaveReceiveMsg', message)
        })
    },
    visio: (io, client) => {
        client.on('newVisio', (room) => {
            let videoCapture = new cv.VideoCapture(0)
            client.to(room).emit('emitNewVisio', client.client.conn.id)
            setInterval(() => {
                let image = cv.imencode(".jpg", videoCapture.read()).toString("base64")
                io.in(room).compress(false).emit('newImageForVisio', client.client.conn.id, image)
            }, 1000 / 30)
        })
    }
}

module.exports = chat