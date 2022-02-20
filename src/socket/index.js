const socketio = require("socket.io");
const playerEvents = require("./controllers/player");
const userEvents = require("./controllers/user");

class Socket {
  callbacks = [];
  io = null;
  onlineClients = { current: new Set() };

  constructor(...callbacks) {
    this.callbacks = callbacks;
  }

  listen(httpServer) {
    // bind socket.io to that server
    this.io = socketio(httpServer, {
      cors: {
        origin: [
          "http://localhost:3000",
          "https://web-dwarfs-ac7b51.netlify.app/",
        ],
      },
    });

    this._addMainEvent();

    return this.io;
  }

  _addMainEvent() {
    this.io.on("connection", (socket) => {
      console.info(`Socket id ${socket.id} has connected.`);

      // echoes on the terminal every "hello" message this socket sends
      socket.on("ping", () => {
        console.info(`Socket ${socket.id} says: "ping"`);
        socket.emit("pong", "Pong");
      });

      this._addEventsFromCallbacks(socket);

      this.handleTick();
    });
  }

  _addEventsFromCallbacks(socket) {
    for(const callback of this.callbacks) {
      callback({ ...this, socket });
    }
  }

  handleTick() {
    // will send one message per second to all its clients
    let secondsSinceServerStarted = 0;
    setInterval(() => {
      this.io.emit("seconds", ++secondsSinceServerStarted);
      this.io.emit("online", this.onlineClients.current.size);
    }, 1000);
  }
}

function startSocket(httpServer) {
  const io = new Socket(userEvents, playerEvents);

  io.listen(httpServer);

  return io;
}

module.exports = startSocket;
