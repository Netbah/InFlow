var mongoose = require("mongoose");

var TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  updated_date: { type: Date, default: Date.now },
  author: String
});

module.exports = mongoose.model("Task", TaskSchema);
