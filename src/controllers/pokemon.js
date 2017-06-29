'use strict'

const erros = require('../errors.json')

function PokemonController ({ pokemon }) {
  
  this.Pokemon = pokemon

  this.getAll = async (req, res) => {

    try {
      
      const pokemons = await this.Pokemon.findAll()
      
      res.json(pokemons)

    } catch(err) {

      res.status(500).json(erros.INTERNAL_SERVER_ERROR)

    }
  }
}

module.exports = PokemonController