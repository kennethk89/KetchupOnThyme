 const express = require('express')
 const app = express()
 const bodyParser = require('body-parser')
 const knex = require('knex')({
     client: 'pg',
     connection: {
         database: 'restaurants',
         user: '',
         password: ''
     }
 })
const bookshelf = require('bookshelf')(knex)

const Restaurant = bookshelf.Model.extend({
    tableName: 'Restaurants',
    tables: function() {
        return this.hasMany(Table)
    }
})

const Table = bookshelf.Model.extend({
    tableName: 'Tables',
    restaurant: function() {
        return this.belongsTo(Restaurant)
    }
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/create', (req, res)=>{

})

app.listen(8080, ()=>{
    console.log('listening on 8080')
})