const Users = require("../../db/models/user");

function userEvents({ socket, onlineClients }) {
  socket.on("disconnect", ({ id }) => {
    onlineClients.delete(id);
    console.info(`Socket ${socket.id} has disconnected.`);
  });

  socket.on("login", async ({ nickname, password }) => {
    const foundUser = await Users.findOne({ nickname });

    if (!foundUser) {
      socket.emit("auth-error", "Invalid credentials");
      return;
    }

    if (foundUser.password !== password) {
      console.log('Invalid credentials');
      socket.emit("auth-error", "Invalid credentials");
      return;
    }

    onlineClients.add(foundUser._id);
    socket.emit("loginSuccess", foundUser);
  });

  socket.on("register", async ({ nickname, password }) => {
    const foundUser = await Users.findOne({ nickname });

    if (foundUser) {
      throw new Error("Username is already used");
    }

    const createdUser = await Users.create({ nickname, password });

    onlineClients.add(createdUser._id);
    socket.emit("registerSuccess", createdUser);
  });
}

module.exports = userEvents;
