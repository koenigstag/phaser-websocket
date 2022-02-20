const Users = require("../../db/models/user");

function userEvents({ socket, onlineClients }) {
  socket.on("disconnect", (reason) => {
    onlineClients.current.delete(socket.handshake.query.UUID);
    console.info(`Socket ${socket.id} has disconnected.`);
  });

  socket.on("login", async ({ username, password }) => {
    if (!username || !password ) {
      socket.emit("auth-error", "Invalid credentials");
    }

    const foundUser = await Users.findOne({ username });

    if (!foundUser) {
      console.log(foundUser);
      socket.emit("auth-error", "Invalid credentials");
      return;
    }

    if (foundUser.password !== password) {
      socket.emit("auth-error", "Invalid credentials");
      return;
    }

    onlineClients.current.add(foundUser._id.toString()); 

    // will send a message only to this socket (different than using `io.emit()`, which would broadcast it)
    socket.emit(
      "welcome",
      `Welcome! You are visitor number ${onlineClients.current.size + 1}`
    );

    socket.emit("loginSuccess", foundUser);
  });

  socket.on("register", async ({ nickname, password }) => {
    if (!username || !password ) {
      socket.emit("auth-error", "Invalid credentials");
    }

    const foundUser = await Users.findOne({ nickname });

    if (foundUser) {
      throw new Error("Username is already used");
    }

    const createdUser = await Users.create({ nickname, password });

    onlineClients.current.add(createdUser._id.toString());
    socket.emit("registerSuccess", createdUser);
  });
}

module.exports = userEvents;
