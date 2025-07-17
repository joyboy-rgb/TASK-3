const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

let noteContent = "";

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.emit('loadContent', noteContent);

  socket.on('updateContent', (data) => {
    noteContent = data;
    socket.broadcast.emit('receiveContent', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`✅ Collaborative editor running at http://localhost:${PORT}`);
});
