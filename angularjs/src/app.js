const express = require ('express')
const routes = require('./routes')
const app = new express()

require('../config')

app.use(express.json())
app.use(routes)

module.exports = app