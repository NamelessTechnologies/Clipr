const io = require("socket.io")(1738, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "https://clipr.vercel.app",
      "https://clipr-danielpasions-projects.vercel.app",
      "https://clipr-git-main-danielpasions-projects.vercel.app",
    ],
  },
});

try {
  io.on("connection", (socket) => {
    socket.on("send-message", (message) => {
      socket.broadcast.emit("recieve-message", message);
      console.log(message);
    });
  });
} catch (error) {
  console.error(error);
}
