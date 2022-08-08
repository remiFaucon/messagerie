module.exports = {
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
    }
}