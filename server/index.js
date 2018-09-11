'use strict'

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('client')); //Para decir que las vistas son estaticas

var port = process.env.PORT || 6677;

var messages = [{
  id: 1,
  text: 'Hola desde socket.io',
  nickname: 'Bot'
}];

io.on('connection', function(socket) {
    console.log('El cliente con IP: '+socket.handshake.address+' Se ha conectado');
    socket.emit('messages', messages);

    socket.on('add-message', function(data) {
      messages.push(data);

      io.sockets.emit('messages', messages);
    });
});

server.listen(port,function() {
    console.log(`funcionando en http://localhost:${port}`);
});
