'use strict'

const express = require('express'),
      path    = require('path'),
      app     = express(),
      errors  = require('./errors.json'),
      logger  = require('./libs/logger.js')

require('./middlewares')(app)
require('./routes')(app)

app.use((err, req, res, next) => {
  logger.error(err)
  res.status(err.status || 500).json(errors.INTERNAL_SERVER_ERROR)
})

module.exports = app 