const express = require('express');
const userController = require('../../controllers/user.controller');

const router = express.Router();

router.get('/user/:id?', (req, res) => {
  userController.get_users(req, res);
});

router.post('/user', (req, res) => {
  userController.create_user(req, res);
});

router.put('/user/:id', (req, res) => {
  userController.update_user(req, res);
});

router.delete('/user/:id', (req, res) => {
  userController.delete_user(req, res);
});

module.exports = router;
