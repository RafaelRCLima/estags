const express = require('express')
const { Router } = require('express')

const movie = require('./movie')

const app = express()
app.use(express.json())

const router = new Router()

require('./config')

router.get('/home', async (req, res) => {
  const movieFound = await movie.findOne()
  res.json(movieFound)
})

router.get('/', (req, res) => {
  res.json('It works')
})

app.use(router)

app.listen(3000, function(){
  console.log('Rodando na 3000')
})