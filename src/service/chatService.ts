const {createMessage, MessageClass, getAllMessages} = require("../models/messages")
import {sysctrl} from "./systemService"

export class chatService {

    private calls = []

    newMessage (client) {
        client.on('newMessage', (message, room) => {
            let msg = new MessageClass()
            msg.message = message
            msg.room = room
            msg.sendBy = client.id
            createMessage().catch(error => console.log(error))
            client.to(room).emit('youHaveReceiveMsg', message)
        })
    }

    getMessages (io, client) {
        client.on('getMessages', (userId) => {
            let roomId = sysctrl.getRoomId(client.id, userId)
            let messages = getAllMessages(roomId)
            io.to(client.id).emit('allMessages', messages)
        })
    }

    visio (io, client) {
        client.on('newVisio', (room, peerUserId) => {
            let callExist = false
            for (let i = 0; i < Object.entries(this.calls).length; i++) {
                if (this.calls[i].room === room) {
                    //TODO insert user in calls
                    callExist = true
                }
            }
            if (!callExist){
                this.calls.push({ room: room, users: []})
            }

            for (let i=0; i < this.calls.length, i++;) {
                if (call[i].room === room) {
                    client.to(room).emit("newUserVisio", call[i].users)
                    this.calls[i].users.push(peerUserId)
                }
            }
        })
    }
}
