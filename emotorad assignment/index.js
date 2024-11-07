// index.js
const express = require('express');
const sequelize = require('./config/database');
const identifyRouter = require('./routes/identify');

const app = express();
app.use(express.json());
app.use('/identify', identifyRouter);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
});
