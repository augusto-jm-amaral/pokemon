'use strict'

const { Router }        = require('express'),
			db                = require('./../models'),
			pokemonCtrl       = require('./../controllers/pokemon.js'),
			router            = Router(),
			validation        = require('./validations')

router.get('/', validation.pokemon.getAll, pokemonCtrl.getAll.bind(pokemonCtrl))
			.post('/', validation.pokemon.create, pokemonCtrl.create.bind(pokemonCtrl))
			.post('/buy', validation.pokemon.buy, pokemonCtrl.buy.bind(pokemonCtrl))

module.exports = router
