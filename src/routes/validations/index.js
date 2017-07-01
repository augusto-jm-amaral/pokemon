'use strict'

const fs        = require('fs'),
      path      = require('path')

fs.readdirSync(path.join(__dirname)).forEach((filename) => {

  if(filename.indexOf('index') === -1){

    let model = {}

    model.path = path.join(__dirname, filename)
    model.name = filename.replace(/\.[^/.]+$/, "")

    module.exports[model.name] = require(model.path)
  }
})