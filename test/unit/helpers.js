'use strict'

const chai  = require('chai'),
      sinon = require('sinon'),
      { errors, validations } = require('./../../src/libs/errors.js')      

global.sinon = sinon
global.errors = errors
global.validations = validations

chai.should()