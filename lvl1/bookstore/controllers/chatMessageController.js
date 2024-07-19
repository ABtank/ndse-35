const ChatMessage = require("../models/chatMessage")
const User = require("../models/user")



const getList = async (req, res, next) => {
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
            model: User
        }).select('-__v');
    next()
}

const save = async (req, res, next) => {
    const {
        roomId,
        msg,
        userId } = req.body;
    saveInDB({ roomId, msg, userId }, (err, newChatMessage) => {
        if (!err) {
            req.newChatMessage = newChatMessage;
            res.status(201)
        }
    })
    next();
}

const saveInDB = async (params, cb) => {
    const {
        roomId,
        msg,
        userId } = params;

    const newChatMessage = new ChatMessage({ roomId, msg, userId })
    await newChatMessage.save();
    return cb(null, newChatMessage);
}



module.exports = {
    getList,
    save,
    saveInDB
};
