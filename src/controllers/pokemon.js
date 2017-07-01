'use strict'

const erros   = require('../errors.json'),
      logger  = require('../libs/logger.js'),
      to      = require('../libs/to.js'),
      pagarme = require('../libs/pagarme.js')

class PokemonController {

  constructor ({ pokemon, database }) {
    this.Pokemon = pokemon
    this.db = database
  }

  async getAll (req, res) {
    const [err, pokemons] = await to(this.Pokemon.findAll())

    if(pokemons) 
      return res.json(pokemons)

    logger.error(err)
    res.status(500).json(erros.INTERNAL_SERVER_ERROR)
  }

  async create (req, res) {
    const [err, pokemon] = await to(this.Pokemon.create(req.body))

    if(pokemon)
      return res.json(pokemon.dataValues)

    logger.error(err)
    res.status(500).json(erros.INTERNAL_SERVER_ERROR)
  }

  async buy (req, res) {
    const [errFind, pokemon] = await to(this.Pokemon.findOne({ 
      where: { uuid: req.body.pokemonUUID } 
    }))
    
    if(errFind) {
      logger.error(errFind) 
      return res.status(500).json(erros.INTERNAL_SERVER_ERROR)
    }
    
    if(!pokemon) 
      return res.status(400)

    if(pokemon.stock < req.body.quantity)
      return res.status(400) 

    const [errTra, transaction] = await to(this.db.transaction())
    
    if(errTra) {
      logger.error(errTra) 
      return res.status(500).json(erros.INTERNAL_SERVER_ERROR)
    }

    const [errDre] = await to(pokemon.decrement('stock', { 
      by: req.body.quantity, transaction 
    }))

    if(errDre) {
      logger.error(errDre) 
      return res.status(500).json(erros.INTERNAL_SERVER_ERROR)
    }

    const amount = pagarme.amount(pokemon.price, req.body.quantity)
    
    const metaData = {
      product: 'pokemon',
      name: pokemon.name,
      quantity: req.body.quantity
    } 

    const [errPagar , pagarmeTransaction]  = await to(pagarme.transactionWithCard(
      amount, // Price 
      req.body.card, // Card
      metaData) // Metadata
    ) 

    if(errPagar){
      logger.error(errPagar) 
      await transaction.rollback()
      return res.status(500).json(erros.INTERNAL_SERVER_ERROR)
    }

    if(pagarme.isPaid(pagarmeTransaction)){

      await transaction.commit()
      res.status(200).json(pagarmeTransaction)

    } else {
      
      const transactionFailed = new Error('Transaction failed')
      transactionFailed.transaction = pagarmeTransaction

      logger.error(transactionFailed)

      await transaction.rollback()
      
      res.status(400).json({err: true})
    }
  }
}

module.exports = PokemonController