const express = require('express')
const app = express()
const mainApp = require('./routes/mainApp.js')
const API = require('./routes/API.js')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/', mainApp)
app.use('/api', API)


app.listen(8080, () => {
    console.log('listening on 8080')
})