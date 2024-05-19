const socket = io();

function emitMessage(message) {
  socket.emit("message", message);
}

function emitStartPresentation(stream) {
  socket.emit("start-presentation", { stream });
}

function emitStopPresentation() {
  socket.emit("stop-presentation");
}

socket.on("user-connected", (userId) => {
  console.log("user-connected: " + userId);
  if (Array.isArray(userId)) {
    userId.forEach((id) => addParticipant(id));
  } else {
    addParticipant(userId);
  }
});

socket.on("user-disconnected", (userId) => {
  console.log("user-disconnected: " + userId);
  removeParticipant(userId);
});
