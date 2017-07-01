'use strict'

const winston       = require('winston'),
      fs            = require('fs'),
      path          = require('path'),
      conf          = require('./../config')

const loggerFactory = (_conf, _logdir) => {
  
  winston.emitErrs = true
  
  if(_conf.isProd(_conf)){
    fs.existsSync(_logdir) || fs.mkdirSync(_logdir)
    
    return new (winston.Logger)({
      transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({
          name: 'info-file',
          filename: path.join(_logdir, 'info.log'),
          level: 'info'
        }),
        new (winston.transports.File)({
          name: 'error-file',
          filename: path.join(_logdir, 'error.log'),
          level: 'error'
        })
      ]
    })
  } else {
    return new (winston.Logger)({
      transports: [
        new (winston.transports.Console)()
      ]
    })
  }
}

const logger = loggerFactory(conf, conf.get('LOG_DIR'))

module.exports = logger
module.exports.stream = {
    write: (message, encoding) => {
        logger.info(message)
    }
}