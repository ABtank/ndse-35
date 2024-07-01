module.exports = function(io) {
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
        console.log(`roomName ${roomName}`,socket.handshake.query)
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
    });
  }
  