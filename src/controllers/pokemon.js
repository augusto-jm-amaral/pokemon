'use strict'

const logger                  = require('./../libs/logger.js'),
      to                      = require('./../libs/to.js'),
      pagarme                 = require('./../libs/pagarme.js'),
      { errors, validations } = require('./../libs/errors.js'),
      { pokemon, database }   = require('./../models'),
      Pokemon                 = pokemon

const getAll = async function(req, res) {
    const [err, pokemons] = await to(this.Pokemon.findAll())

    if(pokemons) 
      return res.json(pokemons)

    logger.error(err)
    return res.status(errors.INTERNAL_SERVER.status)
              .json(errors.INTERNAL_SERVER)
  }

const create = async function(req, res) {
    const [err, pokemon] = await to(this.Pokemon.create(req.body))

    if(pokemon)
      return res.json(pokemon.dataValues)

    logger.error(err)
    return res.status(errors.INTERNAL_SERVER.status)
              .json(errors.INTERNAL_SERVER)
  }

const buy = async function(req, res) {

    const [errFind, pokemon] = await to(this.Pokemon.findOne({ 
      where: { uuid: req.body.pokemonUUID } 
    }))
    
    if(errFind) {
      logger.error(errFind) 
      return res.status(errors.INTERNAL_SERVER.status)
                .json(errors.INTERNAL_SERVER)
    }

    if(!pokemon) 
      return res.status(errors.PRODUCT_NFOUND.status)
                .json(errors.PRODUCT_NFOUND)

    if(pokemon.stock < req.body.quantity)
      return res.status(errors.OUT_STOCK.status)
                .json(errors.OUT_STOCK)

    const [errTra, transaction] = await to(this.database.transaction())
    
    if(errTra) {
      logger.error(errTra) 
      return res.status(errors.INTERNAL_SERVER.status)
                .json(errors.INTERNAL_SERVER)
    }

    const [errDre] = await to(pokemon.decrement('stock', { 
      by: req.body.quantity, transaction 
    }))

    if(errDre) {
      logger.error(errDre) 
      return res.status(errors.INTERNAL_SERVER.status)
                .json(errors.INTERNAL_SERVER)
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
      return res.status(errors.INTERNAL_SERVER.status)
                .json(errors.INTERNAL_SERVER)
    }

    if(pagarme.isPaid(pagarmeTransaction)){

      await transaction.commit()
      res.status(200).json({
        message: 'Successful transaction',
        status: 'PAID'
      })

    } else {
      
      const transactionFailed = new Error(errors.TRANSACTION_FAILED.message)
      transactionFailed.transaction = pagarmeTransaction

      logger.error(transactionFailed)

      await transaction.rollback()
      
      res.status(errors.TRANSACTION_FAILED.status)
         .json(errors.TRANSACTION_FAILED)
    }
  }

module.exports = {
  Pokemon,
  database,
  getAll,
  create,
  buy
}