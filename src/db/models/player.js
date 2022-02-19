const mongoose = require("mongoose");
const { schema: ItemStacks } = require("./itemstack");

const playerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  stats: {
    health: { type: Number, required: true },
    stamina: { type: Number, required: true },
    hunger: { type: Number, required: true },
    thirst: { type: Number, required: true },
  },
  position: {
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
    z: {
      type: Number,
      required: true,
    },
    realm: {
      type: String,
      enum: ["MAIN"],
      default: "MAIN",
    },
  },
  inventory: {
    belt: { type: [ItemStacks] },
    pockets: { type: [ItemStacks] },
    leftHand: { type: ItemStacks },
    rightHand: { type: ItemStacks },
    backpack: { type: [ItemStacks] },
  },
});

const Players = mongoose.model("players", playerSchema);

module.exports = Players;
