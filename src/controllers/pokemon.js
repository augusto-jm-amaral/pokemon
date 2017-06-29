'use strict'

const erros = require('../errors.json')

function PokemonController ({ pokemon }) {
  
  this.Pokemon = pokemon

  this.getAll = async (req, res, next) => {

    try {
      
      const pokemons = await this.Pokemon.findAll()
      
      // res.json(pokemons)
      next(new Error(erros.INTERNAL_SERVER_ERROR))

    } catch(err) {

      next(new Error(erros.INTERNAL_SERVER_ERROR))

    }
  }
}

module.exports = PokemonController