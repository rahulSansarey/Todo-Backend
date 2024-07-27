const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  duedate: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  createdby: {
    type: mongoose.Schema.ObjectId,
  },
});

const todo = mongoose.model("todo", todoSchema);
module.exports = todo;
