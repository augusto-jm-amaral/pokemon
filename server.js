'use strict'

const app = require('./src/app'),
      port = app.get('port'),
      logger = require('./src/libs/logger.js')

module.exports = app.listen(port, () => {
  logger.log(`Listening on port ${port}`)
})