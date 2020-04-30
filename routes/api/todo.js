const express = require('express');
const todoController = require('../../controllers/todo.controller');

const router = express.Router();

router.get('/todo/:id?', (req, res) => {
  todoController.get_todos(req, res);
});

router.post('/todo', (req, res) => {
  todoController.create_todo(req, res);
});

router.put('/todo/:id', (req, res) => {
  todoController.update_todo(req, res);
});

router.delete('/todo/:id', (req, res) => {
  todoController.delete_todo(req, res);
});

module.exports = router;
