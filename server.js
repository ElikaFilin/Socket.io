const server = require('http').createServer()

const io = require('socket.io')();

server.listen(3000)

io.on('connection', (socket) => {
    socket.join('room 237', () => {
        let rooms = Object.keys(socket.rooms);
        console.log(rooms); // [ <socket.id>, 'room 237' ]
    });
});

io.on('connect', (socket) => {
    console.log('111111111111111111111111');
    socket.binary(false).emit('an event', { some: 'data' }); // The data to send has no binary data
});
io.sockets.emit('hi', 'everyone');

