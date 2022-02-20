const { default: mongoose } = require("mongoose");
const Players = require("../../db/models/player");

const pick = (obj, fields) => {
  const newobj = {};
  for (const field of fields) {
    const elem = obj[field];
    if (elem !== undefined) {
      newobj[field] = elem;
    }
  }
  return newobj;
};

function playerEvents({ socket, onlineClients }) {
  socket.on("move", async ({ userId, ...rest }) => {
    const foundPlayer = await Players.findOne({ userId });

    if (!foundPlayer) {
      socket.emit('error', 'Player not found');
      return;
    }

    foundPlayer.position = {
      ...foundPlayer.position,
      ...pick(rest, ["x", "y", "z"]),
    };

    await foundPlayer.save();

    socket.emit("moved", foundPlayer.position);
  });

  socket.on("getPlayerPos", async ({ userId }) => {
    const foundPlayer = await Players.findOne({ userId });

    socket.emit("moved", foundPlayer.position);
  });

  socket.on("getPlayers", async ({ userId }) => {
    const objIds = Array.from(onlineClients.current).filter(v => v !== userId).map((id) => {
      return mongoose.Types.ObjectId(id);
    })

    const foundPlayers = await Players.find({ 'userId': { $in: objIds } });

    console.log(foundPlayers);
    socket.emit("setPlayers", foundPlayers);
  });
}

module.exports = playerEvents;
