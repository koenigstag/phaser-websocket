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

function playerEvents({ socket }) {
  socket.on("move", async ({ userId, ...rest }) => {
    const foundPlayer = await Players.findOne({ userId });

    foundPlayer.position = {
      ...foundPlayer.position,
      ...pick(rest, ["x", "y", "z"]),
    };

    console.log(foundPlayer);

    await foundPlayer.save();

    socket.emit("moved", foundPlayer.position);
  });

  socket.on("getPlayerPos", async ({ userId }) => {
    const foundPlayer = await Players.findOne({ userId });

    socket.emit("moved", foundPlayer.position);
  });
}

module.exports = playerEvents;
