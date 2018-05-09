const bookshelf = require('../postgreSQL')
const Restaurant = require('./Restaurant.js')

const Table = bookshelf.Model.extend({
  tableName: 'Tables',
  restaurant: function () {
    return this.belongsTo(Restaurant)
  }
})

module.exports = Table