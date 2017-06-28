'use strict'

const express = require('express'),
      path    = require('path'),
      app     = express(),
      models  = require('./models')

require('./middlewares')(app)

module.exports = app 