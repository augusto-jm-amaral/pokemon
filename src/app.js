'use strict'

const express = require('express'),
      path    = require('path')

const app = express()

require('./middlewares')(app)

module.exports = app 