const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const port = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("send_message", (data) => {
    console.log(data);

    io.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
