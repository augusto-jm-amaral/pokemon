'use strict'

const Pokemon = models.pokemon
const defaultPokemonList = [{
	name: 'Omastar',
	price: 70,
	stock: 5
}]
const clone = (obj) => JSON.parse(JSON.stringify(obj))

describe('Routes: Pokemon', async () => {

	const uri = '/pokemons'

	afterEach(async () => {
		await Pokemon.destroy({
			where: {},
			truncate: true
		})
	})
	
	describe('GET /pokemons', async () => {

		before(async () => {
			await Pokemon.create(clone(defaultPokemonList[0]))
		})

		it('should return a list of pokemons', async () => {
			const pokemon = clone(defaultPokemonList[0])

			const res = await request.get(uri)

			res.status.should.be.equal(200)
			res.body[0].name.should.be.equal(pokemon.name)
			res.body[0].price.should.be.equal(pokemon.price)
			res.body[0].stock.should.be.equal(pokemon.stock)
			res.body.length.should.be.equal(defaultPokemonList.length)
		})
	})

	describe('POST /pokemons', async () => {

		afterEach(async () => {
			await Pokemon.destroy({
				where: {},
				truncate: true
			})
		})
		
		it('should return status 200 and created pokemon', async () => {
			const pokemon = clone(defaultPokemonList[0])

			const res = await request.post(uri).send(pokemon)

			res.status.should.be.equal(200)
			res.body.name.should.be.equal(pokemon.name)
			res.body.price.should.be.equal(pokemon.price)
			res.body.stock.should.be.equal(pokemon.stock)
		})		

		it('should return status 400 when create a pokemon with price negative', async () => {
			const pokemon = clone(defaultPokemonList[0])
			pokemon.price = -11

			const res = await request.post(uri).send(pokemon)

			res.status.should.be.equal(400)
		})

		it('should return status 400 when create a pokemon with stock negative', async () => {
			const pokemon = clone(defaultPokemonList[0])
			pokemon.stock = -11

			const res = await request.post(uri).send(pokemon)

			res.status.should.be.equal(400)
		})

		it('should return status 400 when create a pokemon with existing name', async () => {
			const pokemon = clone(defaultPokemonList[0])

			await request.post(uri).send(pokemon)
			const res = await request.post(uri).send(pokemon)

			res.status.should.be.equal(400)
		})

	})

	describe('POST /pokemons/buy', async () => {

		let pokemonUUID;

		beforeEach(async () => {
			const pokemon = await Pokemon.create(clone(defaultPokemonList[0]))
			pokemonUUID = pokemon.dataValues.uuid
		})
		
		// it('should to buy a pokemon', async () => {
		// 	const card = {
		// 		number: "4024007138010896",
		// 		expiration_date: "1050",
		// 		holder_name: "Ash Ketchum",
		// 		cvv: "123"
		// 	}

		// 	const quantity = 3
		// 	const res = await request.post(`${uri}/buy`).send({ pokemonUUID, card, quantity })
		// 	res.status.should.be.equal(200)
		// })

		it('should not buy more pokemon than in stock', async () => {
			const card = {
				number: "4024007138010896",
				expiration_date: "1050",
				holder_name: "Ash Ketchum",
				cvv: "123"
			}

			const quantity = 9

			const res = await request.post(`${uri}/buy`).send({ pokemonUUID, card, quantity })

			res.status.should.be.equal(errors.OUT_STOCK.status)
			res.body.message.should.be.equal(errors.OUT_STOCK.message)
		})

		it('should return status 400 when buy pokemon with quantity negative', async () => {
			
			const card = {
				number: "4024007138010896",
				expiration_date: "1050",
				holder_name: "Ash Ketchum",
				cvv: "123"
			}

			const quantity = -99

			const res = await request.post(`${uri}/buy`).send({ pokemonUUID, card, quantity })

			res.status.should.be.equal(400)
		})
	})
})