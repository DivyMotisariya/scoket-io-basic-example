const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
server.listen(3000, () =>
  console.log("Server started on http://localhost:3000")
);

io.on("connection", (socket) => {
  // console.log(socket);
  socket.username = "Divy";
  console.log(socket.username + ": Connected");

  socket.on("disconnect", () =>
    console.log(socket.username + ": Disconnected")
  );

  socket.on("message_sent", (data) => {
    // console.log(socket.username + ": " + data.msg);

    // return back to sending socket
    // socket.emit("message_sent", data);

    // send to rest users except sender
    // socket.broadcast.emit("message_sent", socket.username + ": " + data.msg);

    // send to all users including sender
    io.emit("message_sent", socket.username + ": " + data.msg);
    // io.joinRoom("room1")
  });

  socket.emit("username", socket.username);
});