export const sysctrl = {
    getOtherIdFromRoomId: (roomId, myId) => {
        let a = roomId.split("")
        let c = ''
        let d = ''
        let count = 0
        a.forEach(b => {
            if (count < 20){
                c += b
            }
            else {
                d += b
            }
            count++
        })
        return c === myId ? d : c
    },
    getRoomId: (user1, user2) => {
        return user1.charCodeAt(0) < user2.charCodeAt(0) ? user1 + user2 : user2 + user1
    }
}