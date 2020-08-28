import { Router } from 'express'
const router = new Router()

import cardController from './controller/cardController'

router.get('/home', (req, res) => {
  res.json({
    message: "Let's duel"
  })
})

router.post('/create', cardController.create)
router.get('/read', cardController.read)
router.post('/loadData', cardController.loadData)

router.get('/createDeck', cardController.createDeck)
router.get('/search', cardController.elasticTest)

export default router
