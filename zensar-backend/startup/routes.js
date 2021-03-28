const express = require('express');
const error = require('../middlewares/error');

module.exports = (app) => {
  app.use(express.json({ extended: false }));
  app.use('/api/user', require('../routes/api/users'));
  app.use(error);
};
