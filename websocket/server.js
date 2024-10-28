const io = require("socket.io")(3000, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  socket.on("send-message", (message) => {
    if (message.user_id != userId) {
      io.emit("recieve-message", message);
    }
    console.log(message);
  });
});
