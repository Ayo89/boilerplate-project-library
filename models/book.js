// models/Issue.js
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  comment: {
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
