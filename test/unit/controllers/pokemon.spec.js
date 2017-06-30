'use strict'

const PokemonController = require('../../../src/controllers/pokemon'),
      errors = require('../../../src/errors.json')

describe('Controllers: Pokemon', async () => {
  
  const defaultPokemonList = [{
      name: 'Omastar',
      price: '70',
      stock: '9999'
    }]

  let database = {
    pokemon: {}
  }

  describe('getAll() pokemons', async () => {

    it('should return a list of pokemons', async () => {

      const request = {}
      const response = {
        json: sinon.spy()
      }

      database.pokemon.findAll = sinon.stub()
      database.pokemon.findAll.withArgs().resolves(defaultPokemonList)

      const pokemonController = new PokemonController(database)
      await pokemonController.getAll(request, response)

      sinon.assert.calledWith(response.json, defaultPokemonList)

    })

    it('should return status 500 when error occurs', async () => {

      const request = {}
      const response = {
        status: sinon.stub(),
        json: sinon.spy()
      }

      response.status.withArgs(500).returns(response)
      database.pokemon.findAll = sinon.stub()
      database.pokemon.findAll.withArgs().rejects({message: 'Error'})

      const pokemonController = new PokemonController(database)
      await pokemonController.getAll(request, response)

      sinon.assert.calledWith(response.json, errors.INTERNAL_SERVER_ERROR)
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

      database.pokemon.create = sinon.stub()
      database.pokemon.create.withArgs(pokemonModel).resolves({dataValues: pokemonModel})

      const pokemonController = new PokemonController(database)
      await pokemonController.create(request, response)

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
      database.pokemon.create = sinon.stub()
      database.pokemon.create.withArgs(pokemonModel).rejects({message: 'Error'})

      const pokemonController = new PokemonController(database)
      await pokemonController.create(request, response)

      sinon.assert.calledWith(response.json, errors.INTERNAL_SERVER_ERROR)
      sinon.assert.calledWith(response.status, 500)

    })
  })
})