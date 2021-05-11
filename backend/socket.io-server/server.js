var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

let messages = [];

io.on('connection', socket => {
  console.log('a user connected!');

  socket.on('new_message', (message) => {
    messages.push({
      name: message.name,
      content: message.content,
      color: message.color,
      time: message.time,
    });
    io.emit('messages', messages);
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected!');
  });
});
server.listen(3000);
