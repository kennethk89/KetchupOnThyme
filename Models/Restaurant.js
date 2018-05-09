const bookshelf = require('../postgreSQL')
const Table = require('./Table.js')

const Restaurant = bookshelf.Model.extend({
  tableName: 'Restaurants',
  tables: function () {
    return this.hasMany(Table)
  }
})

module.exports =Restaurant