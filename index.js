
const http = require("http");
const { app } = require("./src/express");
const { startSocket } = require("./src/socket");

const SERVER_PORT = process.env.PORT || 5000;

function startServer() {
  // create http server and wrap the express app
  const server = http.createServer(app);

  startSocket(server);

  // important! must listen from `server`, not `app`, otherwise socket.io won't function correctly
  server.listen(SERVER_PORT, () => console.info(`Listening on port ${SERVER_PORT}.`));

  return { server }
}

module.exports = startServer();
