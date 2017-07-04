'use strict'

const supertest = require('supertest'),
			chai      = require('chai'),
			app       = require('./../../src/app.js'),
			models    = require('./../../src/models'),
			{ errors, validations } = require('./../../src/libs/errors.js')

global.models = models
global.request = supertest(app)
global.errors = errors
global.validations = validations

chai.should()