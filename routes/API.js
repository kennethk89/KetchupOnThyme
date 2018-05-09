const express = require('express');
const API = express.Router();
const Restaurant = require ('../Models/Restaurant.js')
const Table = require ('../Models/Table.js')

const yelp = require('yelp-fusion');
const client = yelp.client('RaYrtt0iSkBHwTvsj40uxo0hg8tLulmiyg9EpnPaXM14FG4foZ-j91rhiCLUiSma3VNKpHF0kyRBfeNFHwTdTyV4jJu2brk9M5aCwEElkCR0aYA_NrSRStAWzHOxWnYx');

//CREATE
API.post('/createRestaurant', (req, res) => {
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

API.post('/createTable', (req, res) => {
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


API.post('/ownerFilter', (req, res) => {
  Restaurant
    .where({ id: req.body.id })
    .fetch({ withRelated: ['tables'] })
    .then(restaurant => {

      let tablesArr = restaurant.related('tables').models.map((table) => {
        return {
          name: restaurant.attributes.name,
          id: table.attributes.id,
          Restaurant_id: table.attributes.Restaurant_id,
          total_pax: table.attributes.total_pax,
          current_pax: table.attributes.current_pax
        }
      })
      res.json(tablesArr)
    })
})

API.post('/opFilter', (req, res) => {
  Restaurant
    .where({ id: req.body.id })
    .fetch({ withRelated: ['tables'] })
    .then(restaurant => {
      let tablesArr = restaurant.related('tables').models.map((table) => {
        return {
          name: restaurant.attributes.name,
          id: table.attributes.id,
          Restaurant_id: table.attributes.Restaurant_id,
          total_pax: table.attributes.total_pax,
          current_pax: table.attributes.current_pax
        }
      })
      res.json(tablesArr)
    })
})


//READ
API.post('/', (req, res) => {
  Table.fetchAll()
    .then(tables => {
      res.json(tables.models.map(table => table.attributes))
    })
})

API.post('/getRestaurants', (req, res) => {
  Restaurant.fetchAll()
    .then(restaurants => {
      res.json(restaurants.models.map(restaurant => restaurant.attributes))
    })
})

API.post('/getTables', (req, res) => {
  console.log(req.body.name)
  Restaurant
    .where({ name: req.body.name })
    .fetch({ withRelated: ['tables'] })
    .then((restaurant) => {
      console.log(restaurant.attributes)
      let allTables = restaurant.relations.tables.models.map((table) => {
        return table.attributes
      })
      res.json(allTables)
    })
})

//UPDATE
API.put('/update', (req, res) => {
  console.log(req.body.updatedPax)
  console.log(req.body.tableId)
  console.log(req.body.restId)
  let updateSeats = {
    current_pax: req.body.updatedPax
  }
  Table
    .where({ id: req.body.tableId })
    .save(updateSeats, { patch: true })
    .then((table) => {
      res.json(table.attributes)
    })
})

//DELETE
API.put('/clear', (req, res) => {
  console.log(req.body.tableId)
  let clearTable = {
    current_pax: 0
  }
  Table
    .where({ id: req.body.tableId })
    .save(clearTable, { patch: true })
    .then((table) => {
      res.json(table.attributes)
    })
})

//YELP RATING
API.post('/yelpSearch', (req, res) => {
  client.search({
    term: `${req.body.searchLocation}`,
    location: 'vancouver'
  }).then(response => {
    client.business(`${response.jsonBody.businesses[0].id}`).then(response => {
      console.log(response.jsonBody)
      res.json(response.jsonBody)
    }).catch(e => {
      console.log(e);
    });
  }).catch(e => {
    console.log(e);
  });
})

module.exports = API;