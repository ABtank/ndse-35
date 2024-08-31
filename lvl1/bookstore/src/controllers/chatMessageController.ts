import { ChatMessage } from "../models/chatMessage";
import { UserModel } from "../models/user";

export class ChatMessageController {

    getList = async (req: any, res: any, next: any) => {
        const { roomId } = req;
        // req.chatMessages = await ChatMessage
        //     .find({ roomId })
        //     .sort({ dtCreate: -1 }) // сортировка по убыванию даты
        //     .limit(10) // ограничение количества записей
        //     .select('-__v');

        req.chatMessages = await ChatMessage
            .find({ roomId: roomId })
            .sort({ dtCreate: -1 })
            .populate({
                path: 'userId',
                model: UserModel
            }).select('-__v');
        next()
    }

    save = async (req: any, res: any, next: any) => {
        const {
            roomId,
            msg,
            userId } = req.body;
        this.saveInDB({ roomId, msg, userId }, (err: any, newChatMessage: any) => {
            if (!err) {
                req.newChatMessage = newChatMessage;
                res.status(201)
            }
        })
        next();
    }

    saveInDB = async (params: { roomId: any; msg: any; userId: any; }, cb: Function) => {
        const {
            roomId,
            msg,
            userId } = params;

        const newChatMessage = new ChatMessage({ roomId, msg, userId })
        await newChatMessage.save();
        return cb(null, newChatMessage);
    }

}
