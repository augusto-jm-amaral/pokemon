'use strict'

const winston       = require('winston'),
      fs            = require('fs'),
      path          = require('path'),
      winstonRotate = require('winston-daily-rotate-file'),
      { log }       = require('config')

winston.emitErrs = true

const logPath  = path.join(path.dirname(require.main.filename), log.path),
      format = () => (new Date()).toLocaleTimeString()

fs.existsSync(logPath) || fs.mkdirSync(logPath)

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      timestamp: format,
      colorize: true,
      level: 'info'
    }),
    new (winstonRotate)({
      filename: path.join(logPath, '.log'),
      timestamp: format,
      datePattern: 'dd-MM-yyyy',
      prepend: true,
      level: 'info'
    })
  ],
  exitOnError: false
});

module.exports = logger
module.exports.stream = {
    write: (message, encoding) => {
        logger.info(message)
    }
};