const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
  // any code here will run upon the 'connection' event
  console.log(`user: ${socket.id} connected`);

  /* Add your listeners here! */
  // create a listener using socket.on(eventName, callback)
  socket.on('example', data => {
    const newData = `${data}, all connected clients should get this alert`;
    // io.emit triggers listeners for all connected clients
    io.emit('clientSocketName', newData);
  });

  // another example with a built-in event called 'disconnect'
  socket.on('disconnect', () => {
    // 'socket.broadcast.emit' triggers event called 'logged off' on client side and sends to all connected clients except sender client
    socket.broadcast.emit('logged off', `user: ${socket.id} disconnected`);
  });
});

httpServer.listen(3000);