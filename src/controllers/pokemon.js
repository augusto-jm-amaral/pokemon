'use strict'

const erros = require('../errors.json')

function PokemonController ({ pokemon }) {
  
  this.Pokemon = pokemon

  this.getAll = (req, res) => {
    return this.Pokemon.findAll()
      .then( pokemons => {
        res.json(pokemons)
      }).catch( err => {
        res.status(500).json(erros.INTERNAL_SERVER_ERROR)
      })
  }
}

module.exports = PokemonController