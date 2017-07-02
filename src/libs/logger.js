'use strict'

const winston       = require('winston'),
      fs            = require('fs'),
      path          = require('path'),
      conf          = require('./../config')

const loggerFactory = (_conf, _logdir) => {
  
  winston.emitErrs = true
  
  if(_conf.isProd(_conf)){

    const logPath  = path.join(path.dirname(require.main.filename), _logdir)

    fs.existsSync(logPath) || fs.mkdirSync(logPath)
    
    return new (winston.Logger)({
      transports: [
        new (winston.transports.Console)({
          colorize: true
        }),
        new (winston.transports.File)({
          name: 'info-file',
          filename: path.join(logPath, 'info.log'),
          level: 'info'
        }),
        new (winston.transports.File)({
          name: 'error-file',
          filename: path.join(logPath, 'error.log'),
          level: 'error'
        })
      ]
    })
  } else if(_conf.isTest(_conf)) {
    return new (winston.Logger)({
      transports: []
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