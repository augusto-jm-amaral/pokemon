'use strict'

const express = require('express'),
      path    = require('path'),
      app     = express(),
      errors  = require('./errors.json')

require('./middlewares')(app)
require('./routes')(app)

app.use((err, req, res, next) => {

  res.status(err.status || 500).json(errors.INTERNAL_SERVER_ERROR)
})

module.exports = app 