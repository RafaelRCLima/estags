const express = require('express')

const movie = require('./movie')
const routes = require('./routes')

const app = express()
app.use(express.json())

require('./config')

app.use(routes)

app.listen(3000, function(){
  console.log('Rodando na 3000')
})