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


