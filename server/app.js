const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected`);
  });
});

const port = process.env.PORT || 5000;

server.listen(5000, () => {
  console.log(`server listening on http://localhost:${port}`);
});
