const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

io.on('connection', (socket) => {

    socket.emit('cnt', 'connected ' + socket.id );
    socket.on('request', (msg) => {
        const number = Number(msg);
        if(!!number || number === 0) socket.emit('response', number + 1);
        else socket.emit('response', 'from: ' + socket.id + ' ' + msg);
    });
    socket.emit('disconnect', 'disconnected ' + socket.id);
    socket.on('error', (error) => {
        console.log(error)
    })
});

server.listen(3000, () => {
    console.log('listening on *:3000');
})

process.on('exit', (code) => {
    console.log(`About to exit with code: ${code}`);
})
