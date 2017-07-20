'use strict'

let pokemonCtrl = require('../../../src/controllers/pokemon')

describe('Controllers: Pokemon', async () => {
	
	const defaultPokemonList = [{
		name: 'Omastar',
		price: '70',
		stock: '9999'
	}]

	describe('getAll() pokemons', async () => {

		it('should return a list of pokemons', async () => {

			const request = {}
			const response = {
				json: sinon.spy()
			}

			pokemonCtrl.Pokemon.findAll = sinon.stub()
			pokemonCtrl.Pokemon.findAll.withArgs().resolves(defaultPokemonList)

			await pokemonCtrl.getAll(request, response)

			sinon.assert.calledWith(response.json, defaultPokemonList)

		})

		it('should call next when error occurs', async () => {

			const request = {}
			const response = {}
			const next = sinon.spy()
			const error = new Error('error')

			pokemonCtrl.Pokemon.findAll = sinon.stub()
			pokemonCtrl.Pokemon.findAll.withArgs().rejects(error)

			await pokemonCtrl.getAll(request, response, next)

			sinon.assert.calledWith(next, error)
		})
	})

	describe('create() pokemons', async () => {

		it('should return create a pokemon', async () => {
			
			const pokemonModel = defaultPokemonList[0]

			const request = { 
				body: pokemonModel
			}
			const next  = () => {}
			const response = {
				json: sinon.spy()
			}

			pokemonCtrl.Pokemon.findOne = sinon.stub()
			pokemonCtrl.Pokemon.create = sinon.stub()
			pokemonCtrl.Pokemon.create.withArgs(pokemonModel).resolves({dataValues: pokemonModel})
			pokemonCtrl.Pokemon.findOne.resolves()

			await pokemonCtrl.create(request, response, next)

			sinon.assert.calledWith(response.json, pokemonModel)

		})

		it('should call next when error occurs', async () => {

			const pokemonModel = defaultPokemonList[0]
			const request = { body: pokemonModel }
			const response = {}
			const next = sinon.spy()
			const error = new Error('Error')

			pokemonCtrl.Pokemon.create = sinon.stub()
			pokemonCtrl.Pokemon.findOne = sinon.stub()
			pokemonCtrl.Pokemon.findOne.resolves()
			pokemonCtrl.Pokemon.create.withArgs(pokemonModel).rejects(error)

			await pokemonCtrl.create(request, response, next)

			sinon.assert.calledWith(next, error)
		})
	})
})