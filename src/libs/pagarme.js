'use strict'

const to      = require('./to.js'),
			pagarme = require('pagarme'),
			conf    = require('./../config')

const paymetMethods = {
	CREDIT_CARD: 'credit_card'
}

const transactionStatus = {
	PAID: 'paid'
}

const amount = (_price, _quantity) => {
	return (_price * _quantity) * 100
}

const isPaid = (_pagarmeTransaction) => {
	return (_pagarmeTransaction.status == transactionStatus.PAID)
}

const transactionWithCard = async (_amount, _card, _meta) => {

	const [err, client] = await to(pagarme.client.connect({ 
		api_key: conf.get('PAGARME_API_KEY')
	}));

	const payload = {
		amount: _amount,
		payment_method: paymetMethods.CREDIT_CARD,
		metadata: _meta,
		card_number: _card.number,
		card_holder_name: _card.holder_name,
		card_expiration_date: _card.expiration_date,
		card_cvv: _card.cvv
	}

	return client.transactions.create(payload);
}

module.exports = {
	amount,
	transactionWithCard,
	paymetMethods,
	isPaid
}