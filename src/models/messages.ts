import {getModelForClass, prop, queryMethod} from "@typegoose/typegoose";
import {types} from "@typegoose/typegoose";

interface QueryHelpers {
    findByRoomId: types.AsQueryMethod<typeof findByRoomId>;
}


function findByRoomId(this: types.QueryHelperThis<typeof MessageClass, QueryHelpers>, room: string) {
    return this.find({ room });
}


@queryMethod(findByRoomId)
export class MessageClass {
    constructor(message: string, room: string, sendBy: string ) {
        this.message = message
        this.room = room
        this.sendBy = sendBy
    }

    @prop({required: true})
    public sendBy: string

    @prop({select: false})
    @prop({required: true})
    public room: string

    @prop({required: true})
    public message: string

    public async createMessage() {
        (await model.create({
            message: this.message,
            room: this.room,
            sendBy: this.sendBy
        })).save()
    }
}

let model = getModelForClass<typeof MessageClass, QueryHelpers>(MessageClass)

export async function messagesFromRoom(room: string):Promise<object>{
    return await model.find()
        .findByRoomId(room)
        .orFail()
        .exec()
}