import {getModelForClass, prop} from "@typegoose/typegoose";

import("@typegoose/typegoose")

export class MessageClass {
    @prop({required: true})
    public sendBy: string

    @prop({required: true})
    public room: string

    @prop({required: true})
    public message: string
}

let model = getModelForClass(MessageClass)

export async function createMessage() {
    (await model.create({
        message: this.message,
        room: this.room,
        sendBy: this.sendBy
    })).save()
}

export async function getAllMessages(roomId) {
   return (await model.find({room: roomId}))
}