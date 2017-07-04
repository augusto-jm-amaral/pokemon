'use strict'

const pokemon = require('./pokemon.js')

module.exports = (app) => {

	app.use('/pokemons', pokemon)
}