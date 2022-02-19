const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  label: { type: String, required: true },
  maxStack: { type: Number, enum: [1, 2, 4, 8, 16, 32, 64], required: true },
  weight: {
    type: String,
    enum: ["Very Light", "Light", "Medium", "Heavy"],
    required: true,
  },
  size: {
    type: String,
    enum: [
      "Tiny",
      "Very Small",
      "Small",
      "Medium",
      "Large",
      "Very Large",
      "Huge",
    ],
    required: true,
  },
});
const Items = mongoose.model("items", itemSchema);

module.exports = { model: Items, schema: itemSchema };
