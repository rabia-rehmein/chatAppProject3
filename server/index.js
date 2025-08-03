const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the client folder
app.use(express.static(path.join(__dirname, '../client')));

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('chat message', (data) => {
        // Ensure data contains both username and text
        if (data && data.username && data.text) {
            io.emit('chat message', {
                username: data.username,
                text: data.text
            });
        } else {
            console.log("Invalid message data:", data);
        }
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});