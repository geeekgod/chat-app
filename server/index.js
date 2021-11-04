const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const dotenv = require("dotenv");

dotenv.config();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "https://thisisrishabh-webchatapp.vercel.app",
      "http://localhost:3000",
      process.env.CLIENT_URL
    ],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with Id: ${socket.id} joined the room: ${data}`);
  });

  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected`);
  });
});

const port = process.env.PORT || 5120;

server.listen(port, () => {
  console.log(`server listening on http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.json({ message: "Hello world", data: process.env.CLIENT_URL });
});
