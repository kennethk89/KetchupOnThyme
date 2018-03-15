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
    tables: function () {
        return this.hasMany(Table)
    }
})

const Table = bookshelf.Model.extend({
    tableName: 'Tables',
    restaurant: function () {
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


//CREATE
app.post('/createRestaurant', (req, res) => {
    let newRestaurant = new Restaurant({
        name: req.body.name,
        address: req.body.address,
        hours: req.body.hours
    })
    newRestaurant.save()
        .then((newRestaurant) => {
            res.json(newRestaurant.attributes)
        })
})

app.post('/restFilter', (req, res) => {

    Restaurant
        .where({ id: req.body.id })
        .fetch({ withRelated: ['tables'] })
        .then(restaurant => {

        //use this data.. use it!!
            let restaurantName = restaurant.attributes.name

            let tablesArr = restaurant.related('tables').models.map((table) => {
                return {
                    id: table.attributes.id,
                    Restaurant_id: table.attributes.Restaurant_id,
                    total_pax: table.attributes.total_pax,
                    current_pax: table.attributes.current_pax
                }
            })
            res.json(tablesArr)
        })

})



app.post('/createTable', (req, res) => {
    let newTable = new Table({
        Restaurant_id: req.body.Restaurant_id,
        total_pax: req.body.total_pax,
        current_pax: req.body.current_pax
    })
    newTable.save()
        .then((newTable) => {
            res.json(newTable.attributes)
        })
})

//READ
app.get('/', (req, res) => {
    Table.fetchAll()
        .then(tables => {
            res.json(tables.models.map(table => table.attributes))
        })
})

app.listen(8080, () => {
    console.log('listening on 8080')
})