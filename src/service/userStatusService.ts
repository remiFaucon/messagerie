import {Server, Socket} from "socket.io"
import {DefaultEventsMap} from "socket.io/dist/typed-events"
import {Connected} from "../class/Connected"

export class userStatus {
    room(client: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
        client.leave(client.id)
        client.on('changeRoom', (user1, user2) => {
            let room = user1.charCodeAt(0) < user2.charCodeAt(0) ? user1 + user2 : user2 + user1
            // client.leave(client.rooms[user1])
            client.join(room)
            client.emit('connectToRoom', room)
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