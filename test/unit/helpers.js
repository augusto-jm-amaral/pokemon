'use strict'

const chai  									= require('chai'),
			sinon 									= require('sinon'),
			{ errors, validations } = require('./../../src/libs/errors.js'),
			chaiAsPromised 					= require("chai-as-promised")      

global.sinon = sinon
global.errors = errors
global.validations = validations

chai.use(chaiAsPromised)

chai.should()