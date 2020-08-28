const { Router } = require('express')
const router = new Router()
const client = require('./config')
const movie = require('../mongodb/movie')

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

router.post('/mongoIndex', async (req, res) => {

  const sort = await movie.aggregate([{ $match: { "type": "movie" }},
    { $project: { "title": 1, "year": 1, "type": 1 } },
    { $limit: 10 },
    { $sort: { "year": 1 }}
  ])

  sort.forEach(async function (found) {
    await client.index({
      index: req.body.index,
      body: {
        title: found.title,
        year: found.year,
        type: found.type
      }
    })
  })

  res.json({ message: 'Sucesso' })
  
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