const socketio = require("socket.io");
const { onNewWebsocketConnection, onlineClients } = require("./connection");

function startSocket(httpServer) {
  // bind socket.io to that server
  const io = socketio(httpServer, {
    cors: {
      origin: "*",
    },
  });

  // will fire for every new websocket connection
  io.on("connection", onNewWebsocketConnection);

  // will send one message per second to all its clients
  let secondsSinceServerStarted = 0;
  setInterval(() => {
    secondsSinceServerStarted++;
    io.emit("seconds", secondsSinceServerStarted);
    io.emit("online", onlineClients.size);
  }, 1000);

  return io;
}

module.exports = { startSocket };
