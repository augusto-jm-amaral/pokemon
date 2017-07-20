'use strict'

const express 	 = require('express'),
			app     	 = express(),
			{ errors } = require('./libs/errors.js'),
			logger  	 = require('./libs/logger.js')

require('./middlewares')(app)
require('./routes')(app)

app.use((err, req, res, next) => {

	logger.error(err)

	if(err.type){
		res.status(err.type.status).json(err.type)
		
	}else{
		res.status(errors.INTERNAL_SERVER.status).json(errors.INTERNAL_SERVER)
		
	}
})

module.exports = app 