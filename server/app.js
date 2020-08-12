var express = require('express')
var bodyParser = require('body-parser')
var route = require('./route/index.js')
var app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
route(app)

//node app.js
app.listen(3000)