'use strict'

const express = require('express'),
      path    = require('path'),
      app     = express(),
      { errors } = require('./libs/errors.js'),
      logger  = require('./libs/logger.js')

require('./middlewares')(app)
require('./routes')(app)

app.use((err, req, res, next) => {
  logger.error(err)
  res.status(err.status || errors.INTERNAL_SERVER.status).json(errors.INTERNAL_SERVER)
})

module.exports = app 