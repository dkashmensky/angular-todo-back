const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('config');
const Users = require('./models/user.model');
const Todos = require('./models/todo.model');

const app = express();

// Router
const todoRouter = require('./routes/api/todo');
const userRouter = require('./routes/api/user');

// Middleware
const headers = require('./routes/middleware/headers');
const logger = require('./routes/middleware/logger');

mongoose.connect(
  `mongodb+srv://${config.dblogin}:${config.dbpassword}@cluster0-cor79.gcp.mongodb.net/${config.dbname}`,
  { useNewUrlParser: true },
);

app.options('*', cors());
app.use(express.json());
app.use(headers);
app.use(logger);

app.use('/api', todoRouter);
app.use('/api', userRouter);

app.listen(process.env.PORT || config.port);
console.log(`Server runs on port ${process.env.PORT || config.port}`);
