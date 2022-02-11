const onlineClients = new Set();
let nextVisitorNumber = 1;

function onNewWebsocketConnection(socket) {
  console.info(`Socket ${socket.id} has connected.`);
  onlineClients.add(socket.id);

  socket.on("disconnect", () => {
    onlineClients.delete(socket.id);
    console.info(`Socket ${socket.id} has disconnected.`);
  });

  // echoes on the terminal every "hello" message this socket sends
  socket.on("hello", (helloMsg) =>
    console.info(`Socket ${socket.id} says: "${helloMsg}"`)
  );

  // will send a message only to this socket (different than using `io.emit()`, which would broadcast it)
  socket.emit(
    "welcome",
    `Welcome! You are visitor number ${nextVisitorNumber++}`
  );
}

module.exports = { onNewWebsocketConnection, onlineClients };
