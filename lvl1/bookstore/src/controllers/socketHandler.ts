import { Server } from 'socket.io';
import { UserModel } from '../models/user';
import { container, TYPES } from '../infrastructure/container';
import { ChatMessageController } from './chatMessageController';

const chatMessageController: ChatMessageController = container.get(ChatMessageController);

export class SocketHandler {
    
    connection = function (io: Server): void {
        // Определим входящее соединение
        io.on('connection', (socket) => {
            const { id } = socket
            const { roomId, userId } = socket.handshake.query
    
            // сообщение всем
            socket.on('message-to-all', async (msg) => {
                const user = await UserModel.findById(userId).select('-__v')
                chatMessageController.saveInDB({ roomId, userId, msg: msg.text }, (err: any, newMsg: { msg: any; roomId: any; }) => {
                    if (!err) {
                        const newMessage = {
                            username: user!.email,
                            text: newMsg.msg,
                            type: `room ${newMsg.roomId}`
                        }
                        socket.broadcast.emit('message-to-all', newMessage)
                        socket.emit('message-to-all', newMessage)
                    }
                })
            })
    
            // сообщение в группу
            socket.join(roomId || "")
            socket.on('message-to-room', async (msg) => {
                const user = await UserModel.findById(userId).select('-__v')
                chatMessageController.saveInDB({ roomId, userId, msg: msg.text }, (err: any, newMsg: { msg: any; roomId: string | string[]; }) => {
                    if (!err) {
                        const newMessage = {
                            username: user!.email,
                            text: newMsg.msg,
                            type: `room ${newMsg.roomId}`
                        }
                        socket.to(newMsg.roomId).emit('message-to-room', newMessage)
                        socket.emit('message-to-room', newMessage)
                    }
                })
            })
    
            socket.on('disconnect', () => {
                console.log(`Disconnect ${id}`)
            })
        });
    }
}



