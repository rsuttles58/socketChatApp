const socket = io("http://localhost:9000"); //home namespace
const socket2 = io("http://localhost:9000/admin");

socket.on('connect',()=>{
  console.log(socket.id);
})

socket2.on('connect',()=>{
  console.log(socket2.id);
})

socket2.on('welcome', (message)=>{
  console.log(message);
})

socket.on("messageFromServer", dataFromServer => {
  console.log(dataFromServer);
  socket.emit("messageToServer", { data: "Data from the Client!" });
});

socket2.on("messageFromServer", dataFromServer => {
  console.log(dataFromServer);
  socket.emit("messageToServer", { data: "Data from the Client!" });
});

document.querySelector("#message-form").addEventListener("submit", event => {
  event.preventDefault();
  const newMessage = document.querySelector("#user-message").value;
  socket.emit("newMessageToServer", { text: newMessage });
});

socket.on("messageToClients", message => {
  console.log(message);
  document.querySelector("#messages").innerHTML += `<li>${message.text}</li>`;
});
