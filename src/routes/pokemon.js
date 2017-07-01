'use strict'

const { Router }        = require('express'),
      db                = require('./../models'),
      pokemonCtrl       = require('./../controllers/pokemon.js'),
      router            = Router()

router.get('/', pokemonCtrl.getAll.bind(pokemonCtrl))
      .post('/', pokemonCtrl.create.bind(pokemonCtrl))
      .post('/buy', pokemonCtrl.buy.bind(pokemonCtrl))

module.exports = router
