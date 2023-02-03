import {sysctrl} from './systemService'

function call(io, client) {
    client.on('call', (roomId) => {
        let userId = sysctrl.getOtherIdFromRoomId(roomId, client.id)
        if (Array.from(io.sockets.adapter.rooms.get(roomId).values()).indexOf(userId) === -1) {
            io.to(userId).emit('callNotification', client.id)
        }
        else {
            client.to(roomId).emit("MsgNotification", "call", client.id)
        }
    })
}

function message(io, client) {
    // TODO Remove ?
}


module.exports = {
    notifications: (io, client) => {
        call(io, client)
        message(io, client)
    }
}

function findKey(ary, findVal){
    for(let i = 0; i < ary.length; i++){
        for(const key in ary[i]){
            if(ary[i][key] === findVal){
                return true
            }
        }
    }
    return false
}
