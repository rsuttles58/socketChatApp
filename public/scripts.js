//The client file
const socket = io("http://localhost:9000"); //home namespace
const socket2 = io("http://localhost:9000/admin"); //admin namespace
//If we get a message from the server
socket.on("messageFromServer", dataFromServer => {
  console.log(dataFromServer);
  //Send back to the server this message.
  socket.emit("messageToServer", { data: "Data from the Client!" });
});

socket2.on('welcome', (dataFromServer)=>{
    console.log(dataFromServer);
})

document.querySelector("#message-form").addEventListener("submit", event => {
  event.preventDefault();
  const newMessage = document.querySelector("#user-message").value;
  socket.emit("newMessageToServer", { text: newMessage });
});
