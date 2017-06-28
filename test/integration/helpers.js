'use strict'

const supertest = require('supertest'),
      chai      = require('chai'),
      app       = require('../../src/app.js')

global.app     = app
global.request = supertest(app)
chai.should()