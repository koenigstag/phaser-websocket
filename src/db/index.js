const mongoose = require("mongoose");
const { MONGODB_USER, MONGODB_PASSWORD } = process.env;

async function connectMongoDB () {
  const mongoConnection = await mongoose.connect(`mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@web-dwarfs.nhwmx.mongodb.net/web-dwarfs-db?retryWrites=true&w=majority`);
  return mongoConnection;
}

module.exports = { connectMongoDB };
