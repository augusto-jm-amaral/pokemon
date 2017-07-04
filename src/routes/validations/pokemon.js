'use strict'

const logger									= require('./../../libs/logger.js'),
			to											= require('./../../libs/to.js'),
			{ errors, validations } = require('./../../libs/errors.js'),
			validator 							= require('express-validator')

const getAll = async function(req, res, next) {
	next()
}

const create = async function(req, res, next) {

	req.checkBody('name', validations.EMPTY).notEmpty()

	req.checkBody('price', validations.EMPTY).notEmpty()
	req.checkBody('price', validations.DECIMAL).isDecimal()

	req.checkBody('stock', validations.EMPTY).notEmpty()
	req.checkBody('stock', validations.INTEGER).isInt()

	const [err, result] = await to(req.getValidationResult())

	if(err) {
		logger.error(err)
		return res.status(errors.INTERNAL_SERVER.status)
							.json(errors.INTERNAL_SERVER.message)
							.end()
	}

	if(!result.isEmpty()) {
		logger.info(new Error(errors.BAD_REQUEST.message))
		return res.status(errors.BAD_REQUEST.status)
							.json(result.mapped())
							.end()
	}

	next()
}

const buy = async function(req, res, next) {

	req.checkBody('pokemonUUID', validations.EMPTY).notEmpty()
	req.checkBody('pokemonUUID', validations.UUID).isUUID(4)

	req.checkBody('card.number', validations.EMPTY).notEmpty()
	req.checkBody('card.number', validations.CARD).isCreditCard()

	req.checkBody('card.expiration_date', validations.EMPTY).notEmpty()

	req.checkBody('card.holder_name', validations.EMPTY).notEmpty()

	req.checkBody('card.cvv', validations.EMPTY).notEmpty()
	req.checkBody('card.cvv', validations.INTEGER).isInt()

	req.checkBody('quantity', validations.EMPTY).notEmpty()
	req.checkBody('quantity', validations.INTEGER).isInt()

	const [err, result] = await to(req.getValidationResult())

	if(err) {
		logger.error(err)
		return res.status(errors.INTERNAL_SERVER.status)
							.json(errors.INTERNAL_SERVER.message)
							.end()
	}

	if(!result.isEmpty()) {
		logger.info(new Error(errors.BAD_REQUEST.message))
		return res.status(errors.BAD_REQUEST.status)
							.json(result.mapped())
							.end()
	}

	next()
}

module.exports = {
	getAll,
	create,
	buy
}