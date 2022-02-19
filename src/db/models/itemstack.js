
const mongoose = require("mongoose");

const itemStackSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'items' },
  displayName: { type: String },
  description: { type: String },
  quantity: { type: Number, required: true },
});
const ItemStacks = mongoose.model('itemstacks', itemStackSchema);

module.exports = { model: ItemStacks, schema: itemStackSchema };
