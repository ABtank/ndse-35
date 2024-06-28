const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const app = express()
const server = http.Server(app)
const io = socketIO(server)

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'))
});

app.get('/:id', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'))
});





// Определим входящее соединение
io.on('connection', (socket) => {
    const { id } = socket
    console.log(`Connect ${id}`)

    // сообщение мне
    socket.on('message-to-me', (msg) => {
        msg.type = 'me';
        console.log(`message-to-me `, msg)
        socket.emit('message-to-me', msg)
    })

    // сообщение всем
    socket.on('message-to-all', (msg) => {
        msg.type = 'all';
        console.log(`message-to-all `, msg)
        socket.broadcast.emit('message-to-all', msg)
        socket.emit('message-to-all', msg)
    })

    // сообщение в группу
    const { roomName } = socket.handshake.query
    console.log(`roomName ${roomName}`)
    socket.join(roomName)
    socket.on('message-to-room', (msg) => {
        msg.type = `roomName: ${roomName}`;
        console.log(`message-to-room `, msg)
        socket.to(roomName).emit('message-to-room', msg)
        socket.emit('message-to-room', msg)
    })

    socket.on('disconnect', () => {
        console.log(`Disconnect ${id}`)
    })
})

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`SERVER START ON http://localhost:${PORT}`)
})
