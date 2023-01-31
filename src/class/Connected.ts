export interface user {
    name: string
    socketId: string
}

export class Connected {

    private static allUsers: [user?] = [];

    static setUser(user: user){
        this.allUsers.push({ name: user.name, socketId: user.socketId })
    }

    static getAllInfo() {
        return this.allUsers
    }

    static disconnect(id: string) {
        for (let i = 0; i < this.allUsers.length; i++) {
            if (this.allUsers[i].socketId === id) {
                this.allUsers.splice(i, 1)
            }
        }
    }
}
