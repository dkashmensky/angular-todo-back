/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const Todo = mongoose.model('Todos');

module.exports.get_todos = (req, res) => {
  const { user, status } = req.query;
  const query = {};
  if (user !== 'all') {
    query.created_by = user;
  }
  if (status !== 'all') {
    query.done = status === 'true';
  }

  Todo.find(query, (err, todos) => {
    if (err) {
      res.status(500).json({
        status: err,
      });
      return;
    }

    todos.sort((a, b) => b.creation_date - a.creation_date);

    res.status(200).json({
      status: 'Success',
      todos,
    });
  });
};

module.exports.create_todo = (req, res) => {
  const { user, text, deadline } = req.body;
  const newTodo = new Todo({
    created_by: user,
    text,
    deadline,
  });

  newTodo.save((err, todo) => {
    if (err) {
      res.status(500).json({
        status: err,
      });
      return;
    }

    res.status(200).json({
      status: 'Success',
    });
  });
};

module.exports.delete_todo = (req, res) => {
  const { user } = req.body;
  const { id } = req.params;

  if (!id || !user) {
    res.status(500).json({
      status: 'Todo ID or User ID missing',
    });
    return;
  }

  const query = {
    _id: id,
    created_by: user,
  };

  Todo.findOneAndDelete(query, (err, todo) => {
    if (err) {
      res.status(500).json({
        status: err,
      });
      return;
    }

    if (!todo) {
      res.status(400).json({
        status: 'Not found',
      });
      return;
    }

    res.status(200).json({
      status: 'Success',
    });
  });
};

module.exports.update_todo = (req, res) => {
  const { id } = req.params;
  const {
    user, done, deadline, text,
  } = req.body;

  const query = {
    _id: id,
    created_by: user,
  };

  const update = {
    done,
    text,
    deadline,
  };

  Todo.findOneAndUpdate(query, update, (err, todo) => {
    if (err) {
      res.status(500).json({
        status: err,
      });
      return;
    }

    if (!todo) {
      res.status(400).json({
        status: 'Not found',
      });
      return;
    }

    res.status(200).json({
      status: 'Success',
    });
  });
};
