/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const User = mongoose.model('Users');

module.exports.get_users = (req, res) => {
  const { id } = req.params;
  const query = {};
  if (id) {
    query._id = id;
  }

  User.find(query, (err, users) => {
    if (err) {
      res.status(500).json({
        status: err,
      });
      return;
    }

    res.status(200).json({
      status: 'Success',
      users,
    });
  });
};

module.exports.create_user = (req, res) => {
  const { name } = req.body;
  const newUser = new User({
    name,
  });

  newUser.save((err, user) => {
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

module.exports.delete_user = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(500).json({
      status: 'User ID missing',
    });
    return;
  }

  const query = {
    _id: id,
  };

  User.findOneAndDelete(query, (err, user) => {
    if (err) {
      res.status(500).json({
        status: err,
      });
      return;
    }

    if (!user) {
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

module.exports.update_user = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const query = {
    _id: id,
  };

  const update = {
    name,
  };

  User.findOneAndUpdate(query, update, (err, user) => {
    if (err) {
      res.status(500).json({
        status: err,
      });
      return;
    }

    if (!user) {
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
