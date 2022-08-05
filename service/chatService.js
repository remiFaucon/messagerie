const cv = require('opencv4nodejs')

const chat = {
    newMessage: (client) => {
        client.on('newMessage', (message, room) => {
            //TODO message in room objcect
            client.to(room).emit('youHaveReceiveMsg', message)
        })
    },
    visio: (io, calls, client) => {
        client.on('newVisio', (room) => {
            let callExist = false
            Object.entries(calls).forEach(call => {
                if (call[1].room === room){
                    callExist = true
                }
            })
            if (!callExist){
                calls.push({ room: room, users: []})
            }

            let i = 0
            Object.entries(calls).forEach(call => {
                if (call[1].room === room){
                    client.emit("connectedVisio", call[1].users)
                    calls[i].users.push(client.client.conn.id)
                }
                i++
            })

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