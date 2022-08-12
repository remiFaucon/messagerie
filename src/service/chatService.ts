const {MessageClass, findMessageFromRoomId} = require("../models/messages")
import {sysctrl} from "./systemService"

export class chatService {

    private calls = []

    newMessage (client) {
        client.on('newMessage', (message, room) => {
            console.log(message)
            if (message !== undefined && message !== "") {
                console.log(room)
                let msg = new MessageClass(message, room, client.id)
                msg.createMessage().catch(error => console.log(error))
                client.to(room).emit('youHaveReceiveMsg', message)
            }
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
                if (this.calls[i].room === room) {
                    client.to(room).emit("newUserVisio", this.calls[i].users)
                    this.calls[i].users.push(peerUserId)
                }
            }
        })
    }
}
