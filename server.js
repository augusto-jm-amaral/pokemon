'use strict'

const app  = require('./src/app'),
      port = app.get('PORT')

module.exports = app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})