//The server file
const express = require('express')
const app = express();
const socketio = require('socket.io');

app.use(express.static(__dirname + '/public'))

const expressServer = app.listen(9000);
//socket.io server object
const io = socketio(expressServer);

//when a client connects to the server.  Run this code.
io.on('connection', (socket)=>{
    //When connected, send this code to client.
    socket.emit('messageFromServer',{data:'Welcome to the socketIo server'});
    //When code is received from client, run this.
    socket.on('messageToServer',(dataFromClient)=>{
        console.log(dataFromClient);
    })
})

//On connection to the admin namespace, run the below code.
io.of('/admin').on('connection', (socket)=>{
    console.log('Someone connected to admin namespace');
    //emit welcome event with the data in the second place.
    io.of('/admin').emit('welcome','Welcome to the admin channel!');
})
