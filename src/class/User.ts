import {Schema} from "mongoose";

export class User {
    name: string;
    socketId: string;

    setName(name: string) {
        this.name = name
    }

    setSocketId(socketId: string) {
        this.socketId = socketId
    }

    unset(){
        this.name = undefined
        this.socketId = undefined
    }
}

