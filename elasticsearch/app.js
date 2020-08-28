const express = require('express')

const routes = require('./routes')

const app = express()
app.use(express.json())

require('./../mongodb/config')

app.use(routes)

app.listen(3000, function(){
  console.log('Rodando na porta 3000')
})