var express = require('express')
var socket = require('socket.io')

var app = express()

app.use(express.static('public'))

var server = app.listen(8080)
var io = socket(server)

io.sockets.on('connection', function (socket) {


    console.log('made socket connection', socket.id);

    // Handle chat event
    socket.on('chat', function (data) {
        // console.log(data);
        io.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function (data) {
        socket.broadcast.emit('typing', data);
    });


    socket.on('draw_msg', (data) => {
        socket.broadcast.emit('draw_msg', data);
    })
});
