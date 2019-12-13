const express = require('express')
const app = express();
const socketio = require('socket.io');

app.use(express.static(__dirname + '/public'))

const expressServer = app.listen(9000);
const io = socketio(expressServer);

//when a client connects to the server.  Run this code.
io.on('connection', (socket)=>{
    socket.emit('messageFromServer',{data:'Welcome to the socketIo server'});
    socket.on('messageToServer',(dataFromClient)=>{
        console.log(dataFromClient);
    })
    socket.on('newMessageToServer', (message)=>{
        io.emit('messageToClients', {text:message.text})
    })


})

//On connection to the admin namespace, run the below code.
io.of('/admin').on('connection', (socket)=>{
    console.log('Someone connected to admin namespace');
    //emit welcome event with the data in the second place.
    io.of('/admin').emit('welcome','Welcome to the admin channel!');
})
