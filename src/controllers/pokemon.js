'use strict'

const erros  = require('../errors.json'),
      logger = require('../libs/logger.js'),
      to     = require('../libs/to.js')

class PokemonController {

  constructor ({ pokemon, database }) {
    this.Pokemon = pokemon
    this.db = database
  }

  async getAll (req, res) {
    const [err, pokemons] = await to(this.Pokemon.findAll())

    if(pokemons) return res.json(pokemons)

    logger.error(err)
    res.status(500).json(erros.INTERNAL_SERVER_ERROR)
  }

  async create (req, res) {
    const [err, pokemon] = await to(this.Pokemon.create(req.body))

    if(pokemon) return res.json(pokemon.dataValues)
    logger.error(err)

    res.status(500).json(erros.INTERNAL_SERVER_ERROR)
  }

  async buy (req, res) {

    // this.Pokemon.findOne({ where: { uuid: 'aProject'} }).then( pokemon => {
      
    //   console.log(pokemon)
      
    //   return res.status(200)
    // })


    // this.db.transaction((transaction) => {

    // })

    // https://www.npmjs.com/package/sequelize-transactions

  }
}

module.exports = PokemonController