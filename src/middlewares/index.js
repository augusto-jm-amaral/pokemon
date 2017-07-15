'use strict'

const conf        		 = require('./../config'),
			bodyParser  		 = require('body-parser'),
			cors        		 = require('cors'),
			helmet      		 = require('helmet'),
			compression 		 = require('compression'),
			morgan      		 = require('morgan'),
			logger      		 = require('./../libs/logger.js'),
			validator   		 = require('express-validator'),
			customValidation = require('./../libs/customValidators.js')

module.exports = (app) => {

	app.use(morgan('combined', {'stream': logger.stream}))
	app.use(cors())
	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(helmet())
	app.use(validator(customValidation))
	app.use(compression())
}