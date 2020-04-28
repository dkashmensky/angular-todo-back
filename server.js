const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('config');

const app = express();

// Router

// Middleware
const headers = require('./routes/middleware/headers');
const logger = require('./routes/middleware/logger.js');

mongoose.connect(
  `mongodb+srv://${config.dblogin}:${config.dbpassword}@cluster0-cor79.gcp.mongodb.net/${config.dbname}`,
  { useNewUrlParser: true },
);

app.options('*', cors());
app.use(express.json());
app.use(headers);
app.use(logger);

// app.use('/api', authRouter);

app.listen(80);
