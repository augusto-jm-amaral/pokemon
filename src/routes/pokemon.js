'use strict'

const { Router }        = require('express'),
      db                = require('./../models'),
      PokemonController = require('./../controllers/pokemon.js'),
      pokemonController = new PokemonController(db),
      router            = Router()

router.get('/', pokemonController.getAll.bind(pokemonController))
      .post('/', pokemonController.create.bind(pokemonController))
      .post('/buy', pokemonController.buy.bind(pokemonController))

module.exports = router
