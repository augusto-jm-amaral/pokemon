'use strict'

const express = require('express'),
      path    = require('path'),
      app     = express()

require('./middlewares')(app)
require('./routes')(app)

app.use((err, req, res, next) => {

  console.log(err.name)

  res.sendStatus(err.status || 500);
})

module.exports = app 