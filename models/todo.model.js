const mongoose = require('mongoose');

const { Schema } = mongoose;

const TodoSchema = new Schema({
  created_by: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    required: true,
    default: false,
  },
  text: {
    type: String,
    required: true,
  },
  creation_date: {
    type: Number,
    required: true,
    default: Date.now(),
  },
  deadline: Number,
});

module.exports = mongoose.model('Todos', TodoSchema);
