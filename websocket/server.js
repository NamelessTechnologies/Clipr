const io = require("socket.io")(3000, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

io.on("connnection", (socket) => {
  console.log(socket.id);
});
