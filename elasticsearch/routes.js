const { Router } = require('express')
const router = new Router()
const client = require('./config')

router.post('/indexar', async (req, res) => {

  await client.index({
    index: req.body.index,
    body: {
      character: req.body.character,
      quote: req.body.quote
    }
  })

  return res.json({ message: 'Index registered' })

})

router.get('/buscar', async (req, res) => {
  await client.indices.refresh({ index: 'game-of-thrones' })

  const { body } = await client.search({
    index: req.body.index,
    body: {
      query: {
        match: req.body.search
      }
    }
  })

  console.log(body.hits.hits)
  res.json(body.hits.hits)
})

module.exports = router