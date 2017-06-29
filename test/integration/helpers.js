'use strict'

const supertest = require('supertest'),
      chai      = require('chai'),
      app       = require('../../src/app.js'),
      models    = require('../../src/models')

global.models = models
global.request = supertest(app)

chai.should()