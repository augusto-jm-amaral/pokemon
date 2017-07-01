'use strict'

const fs        = require('fs'),
      path      = require('path'),
      Sequelize = require('sequelize'),
      conf      = require('./../config'),
      logger    = require('./../libs/logger.js')

const options = {
  dialect: conf.get('DB_DIALECT'),
  logging: (log) => {
    logger.info(log)
  }
}

const db = new Sequelize( 
  conf.get('DB_NAME'), 
  conf.get('DB_USER'), 
  conf.get('DB_PASS'),
  options)

fs.readdirSync(path.join(__dirname)).forEach((filename) => {

  if(filename.indexOf('index') === -1){

    let model = {}

    model.path = path.join(__dirname, filename)
    model.name = filename.replace(/\.[^/.]+$/, "")

    module.exports[model.name] = db.import(model.path)
  }
})

db.sync()

module.exports.database = db