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
  const sort = await movie.aggregate([{ $match: { "type": "movie" }},
  { $project: { "title": 1, "year": 1, "type": 1 } },
  { $limit: 10 },
  { $sort: { "year": 1 }}
])
  res.json(sort)
})

router.get('/skip', async (req, res) => {
  let { page = 1 } = req.query
  const toSkip = (page - 1) * 10 
  const skip = await movie.aggregate([
    { $match: { "runtime": 88 } },
    { $project: { "title": 1, "runtime": 1 } },
    { $skip: toSkip },
    { $limit: 10 }
  ])

  res.json(skip)
})

router.get('/unwind', async (req, res) => {
  const unwind = await movie.aggregate([
    { $project: { "genres": 1 } },
    { $unwind: "$genres" },
    { $limit: 10 }
  ])
  res.json(unwind)
})

module.exports = router