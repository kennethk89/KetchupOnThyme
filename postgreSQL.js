const knex = require('knex')({
  client: 'pg',
  connection: {
    database: 'restaurants',
    user: '',
    password: ''
  }
})

const bookshelf = require('bookshelf')(knex)

module.exports = bookshelf