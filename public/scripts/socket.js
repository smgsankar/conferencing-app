const socket = io();

function emitMessage(message) {
  socket.emit("message", message);
}

socket.on("user-connected", (userId) => {
  if (Array.isArray(userId)) {
    refreshParticipants(userId);
  } else {
    addParticipant(userId);
  }
});

socket.on("user-disconnected", (userId) => {
  removeParticipant(userId);
});

socket.on("message", (messageObject) => {
  addMessage(messageObject);
});

socket.on("message-received", (messageObject) => {
  addOwnMessage(messageObject);
});
