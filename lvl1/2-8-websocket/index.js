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



// Определим входящее соединение websocket
require('./socketHandler')(io);


const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`SERVER START ON http://localhost:${PORT}`)
})
