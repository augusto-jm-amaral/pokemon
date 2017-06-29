'use strict'

const Pokemon = models.pokemon

describe('Routes: Pokemon', async () => {
  const defaultPokemonList = [{
      name: 'Omastar',
      price: 70,
      stock: 9999
    }]

  const uri = '/pokemons'

  before(async () => {
    await Pokemon.create(defaultPokemonList[0])
  })

  after(async () => {
    await Pokemon.destroy({
      where: {},
      truncate: true
    })
  })

  describe('GET /pokemons', async () => {
    it('should return a list of pokemons', async () => {
      const pokemon = defaultPokemonList[0]

      const res = await request.get(uri)

      res.status.should.be.equal(200)
      res.body[0].name.should.be.equal(pokemon.name)
      res.body[0].price.should.be.equal(pokemon.price)
      res.body[0].stock.should.be.equal(pokemon.stock)
      res.body.length.should.be.equal(defaultPokemonList.length)
    })
  })
})