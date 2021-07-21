const socket = io.connect("http://localhost:3000", {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket"],
});

// const socket = io({ transports: ['websocket'] });

socket.on("connect", (socket) => {
  // console.log("New user connected");
});

// let btnSend = document.getElementById("send"),
let txtMsg = document.getElementById("message");

txtMsg.addEventListener("keypress", (evt) => {
  if (evt.which === 13) {
    // return btnSend.click();
    let msg = txtMsg.value;
    txtMsg.value = "";
    return socket.emit("message_sent", { msg });
  }
});

socket.on("message_sent", data => console.log(data));

// btnSend.addEventListener("click", (evt) => {
//   socket.emit("message_sent", { msg: txtMsg.value });
// });

socket.on("disconnect", (data) => socket.emit("message_sent", { msg: data }));

socket.on("username", (data) => console.log(data + ": Connected"));

socket.on("connect_error", (err) => console.log(err));