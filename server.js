'use strict'

const app 	 = require('./src/app'),
			conf   = require('./src/config'),
			port	 = conf.get('PORT'),
			logger = require('./src/libs/logger.js')

module.exports = app.listen(port, () => {
	logger.info(`Listening on port ${port}`)
})