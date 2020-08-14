const { Router } = require('express')
const router = new Router()

const movie = require('./movie')

router.get('/home', async (req, res) => {
  const movieFound = await movie.findOne()
  res.json(movieFound)
})

router.get('/', (req, res) => {
  res.json('It works')
})

router.get('/project', async (req, res) => {
  const project = await movie.aggregate([{ $project: { "plot": 1 } }]).limit(10)
  res.json(project)
})

router.get('/match', async (req, res) => {
  const match = await movie.aggregate([{ $match: { "year": 1992 } },
  { $project: { "title": 1, "year": 1 } },
  { $limit: 5 }
])
  res.json(match)
})

router.get('/sort', async (req, res) => {
  req.json({ sort: true })
})

module.exports = router