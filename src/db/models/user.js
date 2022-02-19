
const mongoose = require("mongoose");

const user = new mongoose.Schema({
  username: 'string',
  password: 'string',
});
const Users = mongoose.model('users', user);

module.exports = Users;
