const mongoose = require("mongoose");

//Creates the UserSchema and exports it
const ListItemScema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  list: {
    type: String,
    required: true,
  },
  bought: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const ListItem = mongoose.model("ListItem", ListItemScema);

module.exports = ListItem;