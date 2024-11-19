const io = require("socket.io")(3000, {
  cors: {
    origin: ["http://localhost:5173",],
  },
});

try {
  io.on("connection", (socket) => {
    const userID = socket.handshake.query.userId;
    socket.on("send-message", (message) => {
      socket.broadcast.emit("recieve-message", message);
    });
  });
} catch (error) {
  console.error(error);
}
