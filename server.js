import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";

const app = express();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

let participants = [];

io.on("connection", (socket) => {
  socket.broadcast.emit("user-connected", socket.id);
  participants.push({
    name: socket.id,
    socketId: socket.id,
  });

  socket.emit("user-connected", participants);

  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnected", socket.id);
    participants = participants.filter((user) => user.socketId !== socket.id);
  });

  socket.on("message", (message) => {
    const messageObject = {
      content: message,
      time: new Date().toISOString(),
    };
    socket.emit("message-received", messageObject);
    socket.broadcast.emit("message", {
      ...messageObject,
      sender: socket.id,
    });
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
