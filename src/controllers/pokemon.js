'use strict'

const logger                  										= require('./../libs/logger.js'),
			to                     											= require('./../libs/to.js'),
			pagarme                 										= require('./../libs/pagarme.js'),
			{ errors, validations, customErrorFactory } = require('./../libs/errors.js'),
			{ pokemon, database }   										= require('./../models'),
			Pokemon                 										= pokemon

const getAll = async function(req, res, next) {
	const [err, pokemons] = await to(this.Pokemon.findAll())

	if(pokemons) 
		return res.json(pokemons)

	next(err)
}

const create = async function(req, res, next) {

	const [errTra, transaction] = await to(this.database.transaction())

	if(errTra) return next(errTra)

	const [errFind, pokemon] = await to(this.Pokemon.findOne({
		where: { name: req.body.name },
		transaction
	}))

	if(errFind) {
		transaction.rollback() 
		return next(errFind)
	}

	if(pokemon){
		transaction.rollback() 
		return next(customErrorFactory(errors.PRODUCT_EXISTS))
	} 

	const [err, pokemonCreated] = await to(this.Pokemon.create(req.body, { transaction }))

	if(err) return next(err)

	if(pokemonCreated){
		const [errCommit, successCommit] =  await to(transaction.commit())

		if(errCommit) return next(errCommit)

		return res.json(pokemonCreated.dataValues)
	}

}

const buy = async function(req, res, next) {

	const [errTra, transaction] = await to(this.database.transaction())

	if(errTra) return next(errTra);

	const [errFind, pokemon] = await to(this.Pokemon.findOne({ 
		where: { uuid: req.body.pokemonUUID },
		transaction 
	}))

	if(errFind) {
		transaction.rollback() 
		return next(errFind) 
	}

	if(!pokemon) 
		return next(customErrorFactory(errors.PRODUCT_NFOUND))

	if(pokemon.stock < req.body.quantity)
		return next(customErrorFactory(errors.OUT_STOCK)) 

	const [errDre] = await to(pokemon.decrement('stock', { 
		by: req.body.quantity, transaction 
	}))

	if(errDre) {
		transaction.rollback() 
		return next(errDre)
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
		transaction.rollback()
		return next(errPagar) 
	}

	if(pagarme.isPaid(pagarmeTransaction)){

		const [errCommit, successCommit] = await to(transaction.commit())

		if(errCommit) return next(errCommit)

		res.status(200).json({
			message: 'Successful transaction',
			status: 'PAID',
			code: 999
		})

	} else {

		const transactionFailed = new Error(errors.TRANSACTION_FAILED.message)
		transactionFailed.transaction = pagarmeTransaction
		logger.error(transactionFailed)

		transaction.rollback()

		return next(customErrorFactory(errors.TRANSACTION_FAILED))
	}
}

module.exports = {
	Pokemon,
	database,
	getAll,
	create,
	buy
}