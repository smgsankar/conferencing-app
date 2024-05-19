import express from "express";
import { createServer } from "http";
import path from "path";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static(path.join(path.resolve(), "/public")));

app.get("/", (_, res) => {
  res.sendFile(path.join(path.resolve(), "/index.html"));
});

let participants = [];

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  socket.broadcast.emit("user-connected", socket.id);
  participants.push(socket.id);

  socket.emit("user-connected", participants);

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    socket.broadcast.emit("user-disconnected", socket.id);
    participants = participants.filter((id) => id !== socket.id);
  });

  socket.on("message", (msg) => {
    console.log("message: " + msg);
  });

  socket.on("start-presentation", (data) => {
    console.log("start-presentation: " + data.stream);
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
