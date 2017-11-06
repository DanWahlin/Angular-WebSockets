var express = require('express'),
    app = express(),
    server = require('http').createServer(app);
    io = require('socket.io')(server),
    fs = require('fs');

app.use(express.static(__dirname + '/dist')); 

io.on('connection', (socket) => {

  setInterval(() => {
    var value = ((Math.random() * 50) + 1).toFixed(2);
    console.log('Emitting value: ' + value);
    socket.emit('data', { data: value });
  }, 2000);

  socket.on('clientdata', function (data) {
    console.log(data);
  });

});

server.listen(8080);
console.log('Listening on port 8080');
