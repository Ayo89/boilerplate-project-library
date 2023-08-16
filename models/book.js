// models/Issue.js
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  comments: {
    type: [String],
    default: [],
    require,
  },
  commentcount: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Book", bookSchema);
