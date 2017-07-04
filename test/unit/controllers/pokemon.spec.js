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

		it('should return status 500 when error occurs', async () => {

			const request = {}
			const response = {
				status: sinon.stub(),
				json: sinon.spy()
			}

			response.status.withArgs(500).returns(response)
			pokemonCtrl.Pokemon.findAll = sinon.stub()
			pokemonCtrl.Pokemon.findAll.withArgs().rejects({message: 'Error'})

			await pokemonCtrl.getAll(request, response)

			sinon.assert.calledWith(response.json, errors.INTERNAL_SERVER)
			sinon.assert.calledWith(response.status, 500)

		})
	})

	describe('create() pokemons', async () => {

		it('should return a list of pokemons', async () => {
			const pokemonModel = defaultPokemonList[0]
			const request = { 
				body: pokemonModel
			}
			const response = {
				json: sinon.spy()
			}

			pokemonCtrl.Pokemon.create = sinon.stub()
			pokemonCtrl.Pokemon.create.withArgs(pokemonModel).resolves({dataValues: pokemonModel})

			await pokemonCtrl.create(request, response)

			sinon.assert.calledWith(response.json, pokemonModel)

		})

		it('should return status 500 when error occurs', async () => {

			const pokemonModel = defaultPokemonList[0]
			const request = { 
				body: pokemonModel
			}
			const response = {
				status: sinon.stub(),
				json: sinon.spy()
			}

			response.status.withArgs(500).returns(response)
			pokemonCtrl.Pokemon.create = sinon.stub()
			pokemonCtrl.Pokemon.create.withArgs(pokemonModel).rejects({message: 'Error'})

			await pokemonCtrl.create(request, response)

			sinon.assert.calledWith(response.json, errors.INTERNAL_SERVER)
			sinon.assert.calledWith(response.status, 500)

		})
	})
})