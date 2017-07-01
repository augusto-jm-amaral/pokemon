'use strict'

const conf        = require('./../config'),
      bodyParser  = require('body-parser'),
      cors        = require('cors'),
      helmet      = require('helmet'),
      compression = require('compression'),
      morgan      = require('morgan'),
      logger      = require('./../libs/logger.js')

module.exports = (app) => {

  app.set('port', conf.get('PORT'))

  app.use(morgan('combined', {'stream': logger.stream}))
  app.use(cors())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(helmet())
  app.use(compression())
}