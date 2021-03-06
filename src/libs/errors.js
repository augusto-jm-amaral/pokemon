'use strict'

const validations = {
	EMPTY: 'Is empty',
	DECIMAL: 'The value is not decimal',
	INTEGER: 'Value is not integer',
	UUID: 'Invalid ID',
	CARD: 'Invalid card number',
	NEGATIVE: 'Value in not positive'
}

const errors = {
	INTERNAL_SERVER: {
		message: 'An internal error occurred, please try again',
		code: 1,
		status: 500
	},
	BAD_REQUEST: {
		message: 'Invalid Parameters',
		code: 2,
		status: 400
	},
	OUT_STOCK: {
		'message': 'We do not have this information in stock',
		'code': 3,
		'status': 400
	},
	TRANSACTION_FAILED: {
		'message': 'Transaction failed',
		'code': 4,
		'status': 400
	},
	PRODUCT_NFOUND: {
		'message': 'Product not found',
		'code': 5,
		'status': 404
	},
	PRODUCT_EXISTS: {
		'message': 'This product already exists',
		'code': 6,
		'status': 400
	}
}

const customErrorFactory = (err) => {
	const newError = new Error(err.message)
	newError.type = err
	return newError
}

module.exports = {
	validations,
	errors,
	customErrorFactory
}