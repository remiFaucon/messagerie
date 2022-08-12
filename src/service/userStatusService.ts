import {Server, Socket} from "socket.io"
import {DefaultEventsMap} from "socket.io/dist/typed-events"
import {Connected} from "../class/Connected"
import {messagesFromRoom} from "../models/messages";
import {sysctrl} from "./systemService";

export class userStatus {
    room(io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
         client: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
        client.on('changeRoom', (user1, user2) => {
            // client.leave(client.rooms[user1])
            let room = sysctrl.getRoomId(user1, user2)
            client.join(room)
            messagesFromRoom(room).then(msg => {
                io.to(client.id).emit('connectToRoom', room, msg)
            }).catch((err) => {
                io.to(client.id).emit('connectToRoom', room)
            })
        })
    }

    disconnect (
        io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
        client: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
        client.on('disconnect', () => {
            io.emit('userDisconnect', client.id)
            Connected.disconnect(client.id)
        })
    }
}