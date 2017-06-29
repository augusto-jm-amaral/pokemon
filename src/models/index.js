'use strict'

console.log('teste')

const fs           = require('fs'),
      path         = require('path'),
      Sequelize    = require('sequelize'),
      { database } = require('config')

const db = new Sequelize( database.name, 
  database.username, 
  database.password, 
  database.options)

fs.readdirSync(path.join(__dirname)).forEach((filename) => {

  if(filename.indexOf('index') === -1){

    let model = {}

    model.path = path.join(__dirname, filename)
    model.name = filename.replace(/\.[^/.]+$/, "")

    module.exports[model.name] = db.import(model.path)
  }
})

db.sync()

module.exports.sequelize = db