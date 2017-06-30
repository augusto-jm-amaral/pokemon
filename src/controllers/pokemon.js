'use strict'

const erros  = require('../errors.json'),
      logger = require('../libs/logger.js')

function PokemonController ({ pokemon }) {
  
  this.Pokemon = pokemon

  this.getAll = (req, res) => {
    return this.Pokemon.findAll()
      .then( pokemons => {
        res.json(pokemons)
      }).catch( err => {
        logger.error(err)
        res.status(500).json(erros.INTERNAL_SERVER_ERROR)
      })
  }

  this.create = (req, res) => {

    return this.Pokemon.create(req.body)
      .then( pokemon => {
        res.json(pokemon.dataValues)
      })
      .catch( err => {
        logger.error(err)
        res.status(500).json(erros.INTERNAL_SERVER_ERROR)
      })
  }
}



module.exports = PokemonController