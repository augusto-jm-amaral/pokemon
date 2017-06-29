describe('Routes: Pokemon', () => {
  const defaultPokemon = {
    name: 'Omastar',
    price: '70',
    stock: '9999'
  }

  const uri = '/pokemons'

  describe('GET /pokemons', () => {
    it('should return a list of pokemons', async () => {

      const res = await request.get(uri)

      res.status.should.be.equal(200)
      res.body[0].name.should.be.equal(pokemon.name)
      res.body[0].price.should.be.equal(pokemon.price)
      res.body[0].stock.should.be.equal(pokemon.stock)

    })
  })
})