const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  message: String,
  name: String,
  timestamp:{
    type: Number,
    default: Date.now
  },
  received: Boolean,
});

module.exports = mongoose.model("messagecontents", chatSchema);
