const express = require('express');
const path = require('path');

module.exports = (app) =>
  app.use('/images', express.static(path.join('images', 'users')));
