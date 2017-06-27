'use strict'

const config = require('config')

module.exports = (app) => {
  app.set('PORT', config.PORT)
}